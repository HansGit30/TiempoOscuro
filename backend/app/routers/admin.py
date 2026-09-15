from fastapi import APIRouter, HTTPException, Depends
from app.supabase_client import supabase, supabase_admin
from pydantic import BaseModel
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import traceback

router = APIRouter(prefix="/admin", tags=["Admin"])
security = HTTPBearer()

class SetBestSellerRequest(BaseModel):
    book_id: str

def get_admin_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # Usamos supabase_admin para validar el token de forma segura en el backend
        user_response = supabase_admin.auth.get_user(token)
        if not user_response or not user_response.user:
            raise HTTPException(status_code=401, detail="Token inválido o expirado")
        
        user_id = user_response.user.id
        
        # Consultamos el rol en la tabla profiles
        profile_res = supabase_admin.from_("profiles").select("*").eq("id", user_id).single().execute()
        
        if not profile_res.data or profile_res.data.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Se requieren privilegios de administrador")
            
        return profile_res.data
    except HTTPException as he:
        raise he
    except Exception as e:
        print("--- ERROR EN get_admin_user ---")
        traceback.print_exc()
        raise HTTPException(status_code=401, detail=f"Error de autenticación admin: {str(e)}")

@router.post("/set-best-seller")
def set_best_seller(payload: SetBestSellerRequest, admin_user: dict = Depends(get_admin_user)):
    """Ejecuta la función RPC de PostgreSQL en Supabase"""
    try:
        response = supabase.rpc("set_best_seller_book", {"p_book_id": payload.book_id}).execute()
        return {"message": "Libro más vendido actualizado exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/supplier-requests")
def get_supplier_requests(admin_user: dict = Depends(get_admin_user)):
    """Obtiene la lista de todas las solicitudes pendientes de proveedores"""
    try:
        response = supabase_admin.from_("supplier_requests").select("*").eq("status", "pending").execute()
        return response.data if response.data else []
    except Exception as e:
        print("--- ERROR EN get_supplier_requests ---")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/approve-supplier/{request_id}")
def approve_supplier_request(request_id: str, admin_user: dict = Depends(get_admin_user)):
    """Aprueba una solicitud de proveedor, crea o recupera el usuario en Auth, genera su perfil y su editorial"""
    try:
        # 1. Obtener la solicitud pendiente de la tabla supplier_requests
        req_res = supabase_admin.from_("supplier_requests").select("*").eq("id", request_id).single().execute()
        if not req_res.data:
            raise HTTPException(status_code=404, detail="Solicitud no encontrada")
        
        supplier_data = req_res.data
        email = supplier_data["email"]
        company_name = supplier_data["company_name"]
        publisher_name = supplier_data["publishers_handled"]

        # 2. Contraseña fija asignada por el sistema
        fixed_password = "Password123*"

        new_user_id = None

        # 3. Crear el usuario en Supabase Auth mediante el cliente Admin
        try:
            auth_response = supabase_admin.auth.admin.create_user({
                "email": email,
                "password": fixed_password,
                "email_confirm": True,
                "user_metadata": {"role": "supplier", "company_name": company_name}
            })
            if auth_response.user:
                new_user_id = auth_response.user.id
        except Exception as auth_err:
            # Si el usuario ya existe, lo buscamos y FORZAMOS la actualización de su contraseña temporal
            if "already been registered" in str(auth_err):
                users_list = supabase_admin.auth.admin.list_users()
                existing_user = next((u for u in users_list if u.email == email), None)
                if existing_user:
                    new_user_id = existing_user.id
                    # Forzar el cambio de contraseña alfanumérica al valor temporal actual
                    supabase_admin.auth.admin.update_user_by_id(
                        new_user_id,
                        {
                            "password": fixed_password,
                            "user_metadata": {"role": "supplier", "company_name": company_name}
                        }
                    )
                else:
                    raise HTTPException(status_code=400, detail="El correo ya está registrado en Auth pero no se pudo obtener su identificador.")
            else:
                raise auth_err

        # 4. Crear o actualizar el perfil en la tabla 'profiles'
        supabase_admin.from_("profiles").upsert({
            "id": new_user_id,
            "email": email,
            "company_name": company_name,
            "role": "supplier",
            "is_active": True
        }).execute()

        # 5. Crear automáticamente la editorial (Publisher) vinculada al usuario
        supabase_admin.from_("publishers").insert({
            "name": publisher_name,
            "supplier_id": new_user_id
        }).execute()

        # 6. Actualizar el estado de la solicitud a 'approved'
        supabase_admin.from_("supplier_requests").update({
            "status": "approved"
        }).eq("id", request_id).execute()

        return {
            "message": "Proveedor aprobado con éxito",
            "email": email,
            "assigned_password": fixed_password
        }

    except HTTPException as he:
        raise he
    except Exception as e:
        print("--- ERROR EN approve_supplier_request ---")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))