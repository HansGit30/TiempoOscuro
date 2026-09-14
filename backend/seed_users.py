import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
# Usar la clave de admin service_role
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_SERVICE_KEY:
    raise ValueError("Debes definir SUPABASE_SERVICE_ROLE_KEY en tu archivo .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

users_to_create = [
    {
        "email": "admin@tiempooscuro.com",
        "password": "Admin123!",
        "company_name": "Tiempo Oscuro",
        "role": "admin"
    },
    {
        "email": "proveedor1@planeta.com",
        "password": "Proveedor123!",
        "company_name": "Editorial Planeta",
        "role": "supplier"
    },
    {
        "email": "proveedor2@penguin.com",
        "password": "Proveedor123!",
        "company_name": "Penguin Random House",
        "role": "supplier"
    }
]

for u in users_to_create:
    try:
        res = supabase.auth.admin.create_user({
            "email": u["email"],
            "password": u["password"],
            "email_confirm": True,
            "user_metadata": {
                "company_name": u["company_name"],
                "role": u["role"]
            }
        })
        print(f"✅ Usuario creado exitosamente: {u['email']}")
    except Exception as e:
        print(f"❌ Error creando {u['email']}: {e}")