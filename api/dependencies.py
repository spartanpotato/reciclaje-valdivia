from .database import SessionLocal

# Crear una sesión para cada solicitud
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
