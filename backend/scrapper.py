import requests
from bs4 import BeautifulSoup

def get_url(name:str, salary: int, work_schedule: str):
    if work_schedule == "Полный день":
        work_schedule = "fullDay"
    if work_schedule == "Сменный график":
        work_schedule = "shift"
    if work_schedule == "Удаленная работа":
        work_schedule = "remote"
    if work_schedule == "Вахтовый метод":
        work_schedule = "flyInFlyOut"
    if work_schedule == "Сменный график":
        work_schedule = "flexible"
    
    url = f'https://hh.ru/search/vacancy?area=113&hhtmFrom=main&hhtmFromLabel=vacancy_search_line&employment=part&search_field=name&search_field=company_name&search_field=description&enable_snippets=false&schedule={work_schedule}&text={name}&salary={salary}&only_with_salary=true'
    return url


def get_page(url: str):
    response = requests.get(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0) Edge/12.10136", 'DNT': '1'})
    soup = BeautifulSoup(response.content, 'lxml')
    return soup

def get_vacancies(name: str, salary: int, work_schedule: str):
    schedule = work_schedule
    url = get_url(name, salary, work_schedule)
    page = get_page(url)
    list_vacancies = []
    results = page.find_all('div', {'class': 'vacancy-search-item__card serp-item_link vacancy-card-container--OwxCdOj5QlSlCBZvSggS'})
    for result in results:
        title = result.find('span', {'data-qa': 'serp-item__title'}).text
        work_schedule = schedule
        parse_city = result.find('span', {'data-qa': 'vacancy-serp__vacancy-address_narrow'}).find('span', {'class': 'fake-magritte-primary-text--Hdw8FvkOzzOcoR4xXWni'}).text
        parse_salary = result.find('span', {'class': 'fake-magritte-primary-text--Hdw8FvkOzzOcoR4xXWni compensation-text--kTJ0_rp54B2vNeZ3CTt2 separate-line-on-xs--mtby5gO4J0ixtqzW38wh'}).text
        parse_salary = parse_salary.replace('до вычета налогов', '')
        parse_salary = parse_salary.replace('на руки', '')
        if '–' in parse_salary:
            index = parse_salary.index('–')
            parse_salary = parse_salary[0:index-1].replace('\u202f', '')
        if 'от ' in parse_salary:
            index = parse_salary.index('от ')
            parse_salary = parse_salary[index + 3:].replace('\u202f', '')
        if 'до ' in parse_salary:
            index = parse_salary.index('до ')
            parse_salary = parse_salary[index + 3:].replace('\u202f', '')
        if '₽' in parse_salary:
            index = parse_salary.index('₽')
            parse_salary = parse_salary[0:index-1].replace('\u202f', '')
        if '$' in parse_salary:
            index = parse_salary.index('$')
            parse_salary = parse_salary[0:index-1].replace('\u202f', '')
        if '–' in parse_salary:
            index = parse_salary.index('–')
            parse_salary = parse_salary[0:index-1].replace('\u202f', '')
        parse_experience = result.find('span', {'data-qa': "vacancy-serp__vacancy-work-experience"}).text
        # data = Vacancy(title, schedule, parse_city, actual_salary,
        #                     parse_experience)
        data = {
            'name': title,
            'work_schedule': schedule,
            'city': parse_city,
            'salary': int(parse_salary),
            'experience': parse_experience
        }
        list_vacancies.append(data)
        # print(data)
        # vacancy = Vacancy(name=title, work_schedule=work_schedule, city=parse_city, salary=parse_salary,
        #                                experience=parse_experience)
        # list_vacancies.append(vacancy)
        # print(vacancy)
    return list_vacancies
print(get_vacancies('стажер', 10000, 'Полный день'))
