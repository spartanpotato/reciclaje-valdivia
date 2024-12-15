from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from api.database import Base, engine
from api.models import Usuario, Punto, Comentario, Reporte
from api.schemas import DatosUsuario, UsuarioResponse, CreaPunto, PuntoResponse, ComentarioCreate, ComentarioResponse, ReporteResponse, ReporteCreate
from api.dependencies import get_db
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import joinedload

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    #allow_origins=["http://172.233.25.94:3000", "http://localhost:3000"],  # Orígenes permitidos
    allow_origins=["*"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Crear tablas en la base de datos
Base.metadata.create_all(bind=engine)

#Configuracion del CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://172.233.25.94:3000"],  # Orígenes permitidos
    allow_credentials=True,  # Permitir cookies y credenciales
    allow_methods=["*"],  # Métodos HTTP permitidos
    allow_headers=["*"],  # Encabezados permitidos
)


"""USUARIOS Y AUTENTICACION"""

# Ruta para validar el inicio de sesión
@app.post("/login")
async def login(user_request: DatosUsuario, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.rut == user_request.rut).first()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    if user.contrasena != user_request.contrasena:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return user

# Añade un usuario a la base de datos
@app.post("/usuarios", response_model=UsuarioResponse)
async def create_usuario(usuario: DatosUsuario, db: Session = Depends(get_db)):
    nuevo_usuario = Usuario(**usuario.model_dump())
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

# Devuelve la información de un usuario dado su ID   
@app.get("/usuarios/{id_usuario}", response_model= UsuarioResponse)
async def get_usuario(id_usuario: str, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.rut == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

"""PUNTOS"""

# Devuelve la información de un punto dado su ID
@app.get("/puntos/{id_punto}", response_model= PuntoResponse)
async def get_punto(id_punto: int, db: Session = Depends(get_db)):
    punto = db.query(Punto).filter(Punto.id_punto == id_punto).first()
    if not punto:
        raise HTTPException(status_code=404, detail="Punto no encontrado")
    return punto

# Añade un punto a la base de datos
@app.post("/puntos", response_model= PuntoResponse)
async def crear_punto(punto: CreaPunto, db: Session = Depends(get_db)):
    nuevo_punto = Punto(**punto.model_dump())
    db.add(nuevo_punto)
    db.commit()
    db.refresh(nuevo_punto)
    return nuevo_punto

# Elimina un punto de la base de datos dado su ID
@app.delete("/puntos/{id_punto}", response_model=dict)
async def delete_punto(id_punto: int,  db: Session = Depends(get_db)):
    punto = db.query(Punto).filter(Punto.id_punto == id_punto).first()
    if not punto:
        raise HTTPException(status_code=404, detail="Punto no encontrado")
    db.delete(punto)
    db.commit()
    return {"message": "Punto eliminado exitosamente"}

# Devuelve la información de todos los puntos filtrados por tipo
@app.get("/puntos/{id_tipo}", response_model=list[PuntoResponse])
async def get_puntos_por_tipo(id_tipo: int, db: Session = Depends(get_db)):
    puntos = db.query(Punto).filter(Punto.id_tipo == id_tipo).all()
    return puntos

"""COMENTARIOS"""

# Devuelve la información de todos los comentarios de un punto dado su ID
@app.get("/comentarios/{id_punto}", response_model=list[ComentarioResponse])
async def get_comentarios(id_punto: int, db: Session = Depends(get_db)):
    comentarios = db.query(Comentario).filter(Comentario.id_punto == id_punto).all()
    return comentarios

# Añade un comentario a la base de datos dado el ID del usuario
@app.post("/comentarios", response_model=ComentarioResponse)
async def crear_comentario(comentario: ComentarioCreate, db: Session = Depends(get_db)):
    # Crear el nuevo comentario
    nuevo_comentario = Comentario(**comentario.model_dump())
    db.add(nuevo_comentario)
    db.commit()
    db.refresh(nuevo_comentario)

    # Eager load 'usuario' and 'punto' relationships after commit
    nuevo_comentario = db.query(Comentario).options(
        joinedload(Comentario.usuario),  # Eagerly load 'usuario'
        joinedload(Comentario.punto)    # Eagerly load 'punto'
    ).filter(Comentario.id_comentario == nuevo_comentario.id_comentario).one()

    return nuevo_comentario

# Elimina un comentario de la base de datos dado su ID
@app.delete("/comentarios/{id_comentario}", response_model=dict)
async def delete_comentario(id_comentario: int, db: Session = Depends(get_db)):
    comentario = db.query(Comentario).filter(Comentario.id_comentario == id_comentario).first()
    if not comentario:
        raise HTTPException(status_code=404, detail="Comentario no encontrado")
    db.delete(comentario)
    db.commit()
    return {"message": "Comentario eliminado exitosamente"}


"""REPORTES"""

#  Añade un reporte a la base de datos
@app.post("/reportes", response_model=ReporteResponse)
async def crear_reporte(reporte: ReporteCreate, db: Session = Depends(get_db)):
    nuevo_reporte = Reporte(**reporte.model_dump())
    db.add(nuevo_reporte)
    db.commit()
    db.refresh(nuevo_reporte)
    return nuevo_reporte

# Devuelve la información de todos los reportes de un punto dado su ID
@app.get("/reportes/{id_punto}", response_model=list[ReporteResponse])
async def get_reportes(id_punto: int, db: Session = Depends(get_db)):
    reportes = db.query(Reporte).filter(Reporte.id_punto == id_punto).all()
    return reportes