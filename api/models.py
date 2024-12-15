from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# Modelo para la tabla "usuario"
class Usuario(Base):
    __tablename__ = "usuario"

    rut = Column(String, primary_key=True, index=True)
    nombre = Column(String)
    contrasena = Column(String, nullable=False)
    admin = Column(Boolean, default=False)
    numerotelefono = Column(String, nullable=False)

# Modelo para la tabla "tipo"
class Tipo(Base):
    __tablename__ = "tipo"

    id_tipo = Column(Integer, primary_key=True, index=True)
    plastico = Column(Boolean, default=False)
    vidrio = Column(Boolean, default=False)
    papel_carton = Column(Boolean, default=False)
    latas = Column(Boolean, default=False)
    organico = Column(Boolean, default=False)

# Modelo para la tabla "punto"
class Punto(Base):
    __tablename__ = "punto"

    id_punto = Column(Integer, primary_key=True, autoincremental=True)
    id_tipo = Column(Integer, ForeignKey("tipo.id_tipo"))
    coordx = Column(String, nullable=False)
    coordy = Column(String, nullable=False)
    direccion = Column(String, nullable=False)

    tipo = relationship("Tipo", back_populates="puntos")

# Relación inversa en "Tipo"
Tipo.puntos = relationship("Punto", back_populates="tipo")

# Modelo para la tabla "comentario"
class Comentario(Base):
    __tablename__ = "comentario"

    id_comentario = Column(Integer, primary_key=True, index=True)
    rut = Column(String, ForeignKey("usuario.rut"), nullable=False)
    detalles = Column(String, nullable=False)
    id_punto = Column(Integer, ForeignKey("punto.id_punto"), nullable=False)

    usuario = relationship("Usuario")
    punto = relationship("Punto")

# Modelo para la tabla "reporte"
class Reporte(Base):
    __tablename__ = "reporte"

    id_reporte = Column(Integer, primary_key=True, autoincrement=True)
    id_punto = Column(Integer, ForeignKey("punto.id_punto"), nullable=False)
    rut = Column(String, ForeignKey("usuario.rut"), nullable=False)
    detalles = Column(String, nullable=False)
    estado = Column(String, nullable=False)

    usuario = relationship("Usuario")
    punto = relationship("Punto")