import traceback
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from app.supabase_client import supabase, supabase_admin

router = APIRouter(prefix="/auth", tags=["Auth"])
security = HTTPBearer()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/login")
def login(credentials: LoginRequest):
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": credentials.email,
            "password": credentials.password
        })
        
        user_id = auth_response.user.id
        access_token = auth_response.session.access_token

        profile_response = supabase_admin.from_("profiles").select("*").eq("id", user_id).single().execute()
        
        return {
            "access_token": access_token,
            "user": {
                "id": user_id,
                "email": auth_response.user.email,
                "role": profile_response.data.get("role"),
                "company_name": profile_response.data.get("company_name")
            }
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=401, 
            detail="Credenciales inválidas o error de autenticación"
        )

@router.get("/user-profile/{user_id}")
def get_user_profile(user_id: str):
    try:
        response = supabase_admin.from_("profiles").select("id, email, role, company_name").eq("id", user_id).single().execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
            
        return response.data
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Valida el token JWT usando Supabase y recupera la información del perfil del usuario"""
    token = credentials.credentials
    try:
        response = supabase.auth.get_user(token)
        
        if not response or not response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido o expirado",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        user_id = response.user.id
        
        profile_response = supabase_admin.from_("profiles").select("*").eq("id", user_id).single().execute()
        profile_data = profile_response.data if profile_response.data else {}
        
        user_data = {
            "id": user_id,
            "email": response.user.email,
            "role": profile_data.get("role"),
            "company_name": profile_data.get("company_name"),
            "publisher_id": profile_data.get("publisher_id")
        }
        return user_data
        
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"No se pudo autenticar al usuario: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )