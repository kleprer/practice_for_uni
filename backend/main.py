from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
import database 
from database import new_session, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from scrapper import get_vacancies

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

#pydantic validation model
class VacancyBase(BaseModel):
    name: str
    work_schedule: str
    salary: int

class VacancyModel(VacancyBase):
    city: str
    experience: str
    id: int
    class Config:
        from_attributes = True

def get_db():
    db = new_session()
    try:
        yield db
    finally:

        db.close()

#creating db 
db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.post("/vacancies", response_model=List[VacancyModel])
async def create_vacancies(vacancy: VacancyBase, db: db_dependency):
    # models.Vacancy.__table__.drop(engine, checkfirst=True)
    # db.commit()
    vacancies = db.query(models.Vacancy).all()
    list_vacancies = get_vacancies(name=vacancy.name, salary=vacancy.salary, work_schedule=vacancy.work_schedule)
    print(list_vacancies)
    db_vacancies = []
    for vacancy in list_vacancies:
        db_vacancy = models.Vacancy(name=vacancy['name'], work_schedule=vacancy['work_schedule'], 
                                    city=vacancy['city'], salary=vacancy['salary'], experience=vacancy['experience'])
        if db_vacancy not in vacancies:
            db.add(db_vacancy)
            db.commit()
            db_vacancies.append(db_vacancy)
            db.refresh(db_vacancy)
    return db_vacancies

@app.get("/vacancies", response_model=List[VacancyModel])
async def read_vacancies(db: db_dependency):
    vacancies  = db.query(models.Vacancy).all()
    return vacancies

@app.delete('/vacancies', response_model=List[VacancyModel])
async def delete_vacancies(db: db_dependency):
    vacancies = db.query(models.Vacancy).all()
    for vacancy in vacancies:
        db.delete(vacancy)
        db.commit()
    return vacancies
