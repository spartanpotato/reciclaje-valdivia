from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import Base, engine
from .models import Usuario, Tipo, Punto, Comentario
from .dependencies import get_db
from .schemas import (
    CreaUsuario, ObtieneUsuario,
    TipoBase, TipoResponse,
    PuntoCreate, PuntoResponse,
    ComentarioCreate, ComentarioResponse,
    DatosUsuario
)

app = FastAPI()

# Crear tablas en la base de datos
Base.metadata.create_all(bind=engine)
# Ruta para validar la existencia del usuario
@app.get("/usuarios/{rut}", response_model=DatosUsuario)
async def get_user(rut: str, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.rut == rut).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

# Ruta para validar el inicio de sesión
@app.post("/login")
async def login(user_request: DatosUsuario, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.rut == user_request.rut).first()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return {"message": f"Bienvenido {user.nombre} {user.apellido}"}

# Rutas para "Usuario"
@app.post("/usuarios", response_model=ObtieneUsuario)
def crear_usuario(usuario: CreaUsuario, db: Session = Depends(get_db)):
    nuevo_usuario = Usuario(**usuario.dict())
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

@app.get("/usuarios\{id_usuario}", response_model=ObtieneUsuario)
def get_usuarios(db: Session = Depends(get_db)):
    return db.query(Usuario)

# Rutas para "Tipo"
@app.post("/tipos", response_model=TipoResponse)
def create_tipo(tipo: TipoBase, db: Session = Depends(get_db)):
    nuevo_tipo = Tipo(**tipo.dict())
    db.add(nuevo_tipo)
    db.commit()
    db.refresh(nuevo_tipo)
    return nuevo_tipo

@app.get("/tipos", response_model=List[TipoResponse])
def get_tipos(db: Session = Depends(get_db)):
    return db.query(Tipo).all()

# Rutas para "Punto"
@app.post("/puntos", response_model=PuntoResponse)
def create_punto(punto: PuntoCreate, db: Session = Depends(get_db)):
    nuevo_punto = Punto(**punto.dict())
    db.add(nuevo_punto)
    db.commit()
    db.refresh(nuevo_punto)
    return nuevo_punto

@app.get("/puntos", response_model=List[PuntoResponse])
def get_puntos(db: Session = Depends(get_db)):
    return db.query(Punto).all()

# Rutas para "Comentario"
@app.post("/comentarios", response_model=ComentarioResponse)
def create_comentario(comentario: ComentarioCreate, db: Session = Depends(get_db)):
    nuevo_comentario = Comentario(**comentario.dict())
    db.add(nuevo_comentario)
    db.commit()
    db.refresh(nuevo_comentario)
    return nuevo_comentario

@app.get("/comentarios", response_model=List[ComentarioResponse])
def get_comentarios(db: Session = Depends(get_db)):
    return db.query(Comentario).all()
