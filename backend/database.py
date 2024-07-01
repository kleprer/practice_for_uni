from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

URL = 'sqlite:///./headhunter.db'

engine = create_engine(URL, connect_args={"check_same_thread": False})

new_session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()