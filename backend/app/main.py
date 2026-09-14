from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import books, admin
from app.routers import auth


app = FastAPI(title="Tiempo Oscuro API", version="1.0.0")



app.include_router(auth.router)
# Configuración de CORS para conectar con React
origins = [
    "http://localhost:5173",  # Puerto por defecto de Vite
    "http://localhost:3000",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(books.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"status": "API de Tiempo Oscuro activa"}