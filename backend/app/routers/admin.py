from fastapi import APIRouter, HTTPException
from app.supabase_client import supabase
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["Admin"])

class SetBestSellerRequest(BaseModel):
    book_id: str

@router.post("/set-best-seller")
def set_best_seller(payload: SetBestSellerRequest):
    """Ejecuta la función RPC de PostgreSQL en Supabase"""
    try:
        response = supabase.rpc("set_best_seller_book", {"p_book_id": payload.book_id}).execute()
        return {"message": "Libro más vendido actualizado exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))