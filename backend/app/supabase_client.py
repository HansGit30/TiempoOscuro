import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Cargar las variables de entorno del archivo .env
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_ANON_KEY:
    raise ValueError("Las variables SUPABASE_URL y SUPABASE_KEY deben estar definidas en el archivo .env")

# Cliente para autenticación estándar
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

# Cliente administrativo (bypassea RLS para operaciones internas del servidor)
supabase_admin: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)