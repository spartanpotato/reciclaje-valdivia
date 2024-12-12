from pydantic import BaseModel
from typing import Optional, List

# Esquema de usuario para solicitudes/respuestas
class DatosUsuario(BaseModel):
    rut: str
    nombre: Optional[str] = None
    admin: Optional[bool] = None
    contrasena: str
    numero_telefono: Optional[str] = None

# Esquema para "Usuario"
class UsuarioBase(BaseModel):
    rut: str
    nombre: str
    admin: Optional[bool] = False
    contrasena: str
    numero_telefono: str

class ObtieneUsuario(UsuarioBase):
    class Config:
        orm_mode = True

# Esquema para "Tipo"
class TipoBase(BaseModel):
    plastico: Optional[bool] = False
    vidrio: Optional[bool] = False
    papel_carton: Optional[bool] = False
    latas: Optional[bool] = False
    organico: Optional[bool] = False

class TipoResponse(TipoBase):
    id_tipo: int

    class Config:
        orm_mode = True

# Esquema para "Punto"
class PuntoBase(BaseModel):
    coordx: float
    coordy: float
    direccion: str

class CreaPunto(PuntoBase):
    id_tipo: int

class PuntoResponse(PuntoBase):
    id_punto: int
    tipo: TipoResponse

    class Config:
        orm_mode = True

# Esquema para "Comentario"
class ComentarioBase(BaseModel):
    detalles: str

class ComentarioCreate(ComentarioBase):
    rut: str
    id_punto: int

class ComentarioResponse(ComentarioBase):
    id_comentario: int
    usuario: ObtieneUsuario
    punto: PuntoResponse

    class Config:
        orm_mode = True


# Esquema para Reporte
class ReporteBase(BaseModel):
    id_punto: int
    id_usuario: str
    detalles: str

class ReporteResponse(ReporteBase):
    id_reporte: int
    usuario: ObtieneUsuario
    punto: PuntoResponse

    class Config:
        orm_mode = True