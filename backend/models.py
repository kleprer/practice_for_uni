from database import Base
from sqlalchemy import Column, Integer, String

class Vacancy(Base):
    __tablename__ = 'vacancies'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    work_schedule = Column(String)
    city = Column(String)
    salary = Column(Integer)
    experience = Column(String)


