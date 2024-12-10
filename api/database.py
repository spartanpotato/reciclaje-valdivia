from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de la base de datos (PostgreSQL en este ejemplo)
DATABASE_URL= "postgresql://reciclaje:reciclajeValdivia2024@localhost:5432/reciclaje_valdivia"

# Crear el motor de la base de datos
engine = create_engine(DATABASE_URL)

# Crear una sesión para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para los modelos
Base = declarative_base()
