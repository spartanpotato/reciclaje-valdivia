from .database import engine, Base

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)
