from pydantic import BaseModel
from typing import Optional, List

# Esquema de usuario para solicitudes/respuestas
class DatosUsuario(BaseModel):
    rut: str
    nombre: Optional[str] = None
    admin: Optional[bool] = None
    contrasena: str
    numerotelefono: Optional[str] = None

# Esquema para "Usuario"
class UsuarioBase(BaseModel):
    rut: str
    nombre: str
    admin: Optional[bool] = False
    contrasena: str
    numerotelefono: str

class UsuarioResponse(UsuarioBase):
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
    coordx: str
    coordy: str
    direccion: str

class CreaPunto(PuntoBase):
    id_tipo: int

class PuntoUpdate(BaseModel):
    direccion: str
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
    usuario: UsuarioResponse
    punto: PuntoResponse

    class Config:
        orm_mode = True


# Esquema para Reporte
class ReporteBase(BaseModel):
    estado: str
    id_punto: int
    rut: str
    detalles: str

class ReporteCreate(ReporteBase):
    pass

class ReporteResponse(ReporteBase):
    id_reporte: int
    usuario: UsuarioResponse
    punto: PuntoResponse

    class Config:
        orm_mode = True

class ReporteUpdate(BaseModel):
    estado: str
    
class ReporteGeneralResponse(BaseModel):
    ID: int
    Direccion: str
    CoordX: str
    CoordY: str
    Total: int
    Completa: int
    Eliminada: int
    Pendiente: int
    class Config:
        orm_mode=True