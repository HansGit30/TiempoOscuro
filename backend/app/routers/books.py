import traceback
from fastapi import APIRouter, HTTPException, Depends, Header
from app.supabase_client import supabase, supabase_admin
# Importa la función que extrae/valida el usuario actual desde el token (ajusta el import según tu auth.py)
from app.routers.auth import get_current_user 

router = APIRouter(prefix="/books", tags=["Books"])




@router.get("")
@router.get("/")
def get_all_books():
    try:
        response = supabase.from_("books").select("*").execute()
        return response.data
    except Exception as e:
        print("\n================ ERROR DE SUPABASE ================")
        traceback.print_exc()
        print("===================================================\n")
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/best-seller")
def get_best_seller():
    """Obtiene el libro marcado como más vendido"""
    try:
        response = supabase.from_("books").select("*").eq("is_best_seller", True).single().execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=404, detail="No se encontró libro más vendido")



@router.get("/supplier")
def get_supplier_books(current_user: dict = Depends(get_current_user)):
    """Obtiene únicamente los libros del proveedor/editorial autenticado"""
    try:
        user_id = current_user.get("id")
        print(f"\n--- USER ID AUTENTICADO: {user_id} ---")
        
        # 1. Buscar la editorial en la tabla 'publishers' usando supplier_id
        publisher_res = supabase_admin.from_("publishers").select("*").eq("supplier_id", user_id).execute()
        
        publishers_list = publisher_res.data if publisher_res and publisher_res.data else []
        print(f"--- PUBLISHERS ENCONTRADOS: {publishers_list} ---")
        
        if not publishers_list:
            raise HTTPException(
                status_code=403, 
                detail=f"El usuario con ID {user_id} no tiene una editorial asociada en suppliers_id"
            )
            
        publisher_id = publishers_list[0]["id"]
        
        # 2. Filtrar los libros incluyendo el objeto de la editorial relacionada
        books_res = supabase_admin.from_("books").select("*, publishers(id, name)").eq("publisher_id", publisher_id).execute()
        
        return books_res.data if books_res and books_res.data else []
    except HTTPException as he:
        raise he
    except Exception as e:
        print("\n================ ERROR EN SUPPLIER BOOKS ================")
        traceback.print_exc()
        print("=========================================================\n")
        raise HTTPException(status_code=500, detail=str(e))



