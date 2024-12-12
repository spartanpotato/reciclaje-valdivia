from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import Base, engine
from .models import Usuario, Tipo, Punto, Comentario
from .dependencies import get_db
from .schemas import (
    CreaUsuario, ObtieneUsuario,
    TipoBase, TipoResponse,
    CreaPunto, PuntoResponse,
    ComentarioCreate, ComentarioResponse,
    DatosUsuario
)

app = FastAPI()

# Crear tablas en la base de datos
Base.metadata.create_all(bind=engine)

"""USUARIOS Y AUTENTICACION"""

# Ruta para validar el inicio de sesión
@app.post("/login")
async def login(user_request: DatosUsuario, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.rut == user_request.rut).first()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return {"message": f"Bienvenido {user.nombre} {user.apellido}"}

# Añade un usuario a la base de datos
@app.post("/usuarios", response_model=schemas.UsuarioResponse)
async def create_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    nuevo_usuario = models.Usuario(**usuario.model_dump())
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

# Devuelve la información de un usuario dado su ID   
@app.get("/usuarios/{id_usuario}", response_model=schemas.UsuarioResponse)
async def get_usuario(id_usuario: str, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.rut == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

"""PUNTOS"""

# Devuelve la información de un punto dado su ID
@app.get("/puntos/{id_punto}", response_model=schemas.PuntoResponse)
async def get_punto(id_punto: int, db: Session = Depends(get_db)):
    punto = db.query(models.Punto).filter(models.Punto.id_punto == id_punto).first()
    if not punto:
        raise HTTPException(status_code=404, detail="Punto no encontrado")
    return punto

# Añade un punto a la base de datos
@app.post("/puntos", response_model=schemas.PuntoResponse)
async def crear_punto(punto: schemas.PuntoCreate, db: Session = Depends(get_db)):
    nuevo_punto = models.Punto(**punto.model_dump())
    db.add(nuevo_punto)
    db.commit()
    db.refresh(nuevo_punto)
    return nuevo_punto

# Elimina un punto de la base de datos dado su ID
@app.delete("/puntos/{id_punto}", response_model=dict)
async def delete_punto(id_punto: int,  db: Session = Depends(get_db)):
    punto = db.query(models.Punto).filter(models.Punto.id_punto == id_punto).first()
    if not punto:
        raise HTTPException(status_code=404, detail="Punto no encontrado")
    db.delete(punto)
    db.commit()
    return {"message": "Punto eliminado exitosamente"}

# Devuelve la información de todos los puntos filtrados por tipo
@app.get("/puntos/{id_tipo}", response_model=list[schemas.PuntoResponse])
async def get_puntos_por_tipo(id_tipo: int, db: Session = Depends(get_db)):
    puntos = db.query(models.Punto).filter(models.Punto.id_tipo == id_tipo).all()
    return puntos

"""COMENTARIOS"""

# Devuelve la información de todos los comentarios de un punto dado su ID
@app.get("/comentarios/{id_punto}", response_model=list[schemas.ComentarioResponse])
async def get_comentarios(id_punto: int, db: Session = Depends(get_db)):
    comentarios = db.query(models.Comentario).filter(models.Comentario.id_punto == id_punto).all()
    return comentarios

# Añade un comentario a la base de datos dado el ID del usuario
@app.post("/comentarios/{id_usuario}", response_model=schemas.ComentarioResponse)
async def crear_comentario(id_usuario: str, comentario: schemas.ComentarioCreate, db: Session = Depends(get_db)):
    nuevo_comentario = models.Comentario(**comentario.model_dump(), rut=id_usuario)
    db.add(nuevo_comentario)
    db.commit()
    db.refresh(nuevo_comentario)
    return nuevo_comentario

# Elimina un comentario de la base de datos dado su ID
@app.delete("/comentarios/{id_comentario}", response_model=dict)
async def delete_comentario(id_comentario: int, db: Session = Depends(get_db)):
    comentario = db.query(models.Comentario).filter(models.Comentario.id_comentario == id_comentario).first()
    if not comentario:
        raise HTTPException(status_code=404, detail="Comentario no encontrado")
    db.delete(comentario)
    db.commit()
    return {"message": "Comentario eliminado exitosamente"}


"""REPORTES"""

#  Añade un reporte a la base de datos
@app.post("/reportes/{id_punto}/{id_usuario}", response_model=schemas.ReporteResponse)
async def crear_reporte(id_punto: int, id_usuario: str, reporte: schemas.ReporteCreate, db: Session = Depends(get_db)):
    nuevo_reporte = models.Reporte(**reporte.model_dump(), id_punto=id_punto, rut=id_usuario)
    db.add(nuevo_reporte)
    db.commit()
    db.refresh(nuevo_reporte)
    return nuevo_reporte

# Devuelve la información de todos los reportes de un punto dado su ID
@app.get("/reportes/{id_punto}", response_model=list[schemas.ReporteResponse])
async def get_reportes(id_punto: int, db: Session = Depends(get_db)):
    reportes = db.query(models.Reporte).filter(models.Reporte.id_punto == id_punto).all()
    return reportes