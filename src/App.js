import './App.css';
import { Dropdown } from "flowbite-react";
import { useEffect, useState } from 'react';
import api from './api';

function App() {

  const [vacancyName, setVacancyName] = useState('');
  const [vacancySalary, setVacancySalary] = useState(0);
  const [workSchedule, setWorkSchedule] = useState('Полный день');
  const [vacancies, setVacancies] = useState([]);
  const [filterOne, setFilterOne] = useState('Неважно');
  const [filterTwo, setFilterTwo] = useState('Все');
  const [filterThree, setFilterThree] = useState('Все');
  const [cities, setCities] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (vacancyName != '' & vacancySalary != 0) {
      // await api.delete('/vacancies')
      // fetchVacancies();
      await api.post('/vacancies', {name: vacancyName, work_schedule: workSchedule, salary: +parseInt(vacancySalary,10)})
      console.log(cities);
      fetchVacancies();
      setVacancyName('');
      setVacancySalary(0);
      setWorkSchedule('Полный день');
    }
    
  }

  const handleFilter = (filterOne, filterTwo, filterThree) => {
    fetchVacancies();
    console.log(vacancies);
    console.log(filterTwo, filterThree);
    const filteredVacancies = [];
    for (const vacancy in vacancies) {
      if (vacancy.experience === filterTwo && vacancy.work_schedule === filterThree) {
        filteredVacancies.push(vacancy)
      }
    }
    console.log(filteredVacancies);

  }

  const fetchVacancies = async () => {
      const response = await api.get('/vacancies');
      setVacancies(response.data);
    
  }
  

  useEffect(() => {
    fetchVacancies();
  }, []);

  return (
    <div className="w-[742px] m-auto pt-[20px]">
      <form className="flex w-fit h-fit items-center align-center flex-row gap-[12px] m-auto" onSubmit={(e) => handleSubmit(e)}>
        <input 
        type="text" 
        placeholder="Вакансия" 
        value={vacancyName}
        onChange={(e) => setVacancyName(e.target.value)}
        className="border-black border-[2px] rounded-xl p-[3px] text-[17px] w-[220px]"/>
        <input type="number" min="0"
        placeholder="Зарплата" 
        value={vacancySalary}
        onChange={(e) => setVacancySalary(e.target.value)}
        className="border-black border-[2px] rounded-xl p-[3px] text-[17px]"/>
        <div className="flex items-end align-end w-[178px] border-black border-[2px] rounded-xl p-[4px] text-black">
          <Dropdown className="text-center bg-white w-fit rounded-lg mb-[2px] p-[2px] flex border-black border-[2px] items-center text-black" label={workSchedule} dismissOnClick={true}>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[20px]" onClick={() => setWorkSchedule("Полный день")}>Полный день</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[7px]" onClick={() => setWorkSchedule("Сменный график")}>Сменный график</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[5px]" onClick={() => setWorkSchedule("Удаленная работа")}>Удаленная работа</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[15px]" onClick={() => setWorkSchedule("Гибкий график")}>Гибкий график</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[10px]" onClick={() => setWorkSchedule("Вахтовый метод")}>Вахтовый метод</Dropdown.Item>
          </Dropdown>
        </div>
        <button type="submit" className="bg-gray-300 hover:bg-gray-400 text-[17px] rounded-xl text-center w-[100px] p-[5px]">Найти</button>
      </form>
        <div className='flex m-auto bg-gray-200 w-[500px] mt-[20px] border-black border-[2px] rounded-lg w-[300px] min-h-[35px] text-black'>
          <Dropdown className="text-center bg-white rounded-lg mb-[2px] p-[2px] flex border-black border-[2px] items-center text-black" label={filterOne} dismissOnClick={true}>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px]" onClick={() => setFilterOne('Неважно')}>Неважно</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px]" onClick={() => setFilterOne('По возврастанию')}>По возврастанию</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[15px]" onClick={() => setFilterOne("По убыванию")}>По убыванию</Dropdown.Item>
          </Dropdown>
          <Dropdown className="text-center bg-white w-fit rounded-lg mb-[2px] p-[2px] flex border-black border-[2px] items-center" label={filterTwo} dismissOnClick={true}>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[20px]" onClick={() => setFilterTwo('Все')}>Все</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[20px]" onClick={() => setFilterTwo('Без опыта')}>Без опыта</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[7px]" onClick={() => setFilterTwo("Опыт 1–3 года")}>Опыт 1–3 года</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[7px]" onClick={() => setFilterTwo("Опыт 3–6 лет")}>Опыт 3–6 лет</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[15px]" onClick={() => setFilterTwo("Более 6 лет")}>Более 6 лет</Dropdown.Item>
          </Dropdown>
          <Dropdown className="text-center bg-white w-fit rounded-lg mb-[2px] p-[2px] flex border-black border-[2px] items-center" label={filterThree} dismissOnClick={true}>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[20px]" onClick={() => setFilterThree("Все")}>Все</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[20px]" onClick={() => setFilterThree("Полный день")}>Полный день</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[7px]" onClick={() => setFilterThree("Сменный график")}>Сменный график</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[5px]" onClick={() => setFilterThree("Удаленная работа")}>Удаленная работа</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[15px]" onClick={() => setFilterThree("Гибкий график")}>Гибкий график</Dropdown.Item>
            <Dropdown.Item className="bg-white w-full p-[4px] text-[15px] pl-[10px]" onClick={() => setFilterThree("Вахтовый метод")}>Вахтовый метод</Dropdown.Item>
          </Dropdown>
          <button onClick = {() => handleFilter(filterOne, filterTwo, filterThree)} >Фильтр</button>
        </div>
      <table className="table-fixed text-left w-full  mt-[20px]">
          <thead className="w-full  h-[40px]">
              <tr className="w-full">
                <th className="w-[150px] p-[5px] border-[2px] border-black">Вакансия</th>
                <th className="w-[80px] p-[5px] border-[2px] border-black">Зарплата</th>
                <th className="w-[70px] p-[5px] border-[2px] border-black">Город</th>
                <th className="w-[60px] p-[5px] border-[2px] border-black">Опыт</th>
                <th className="w-[110px] p-[5px] border-[2px] border-black">График работы</th>
              </tr>
          </thead>
          <tbody>
            {vacancies.map((vacancy) => {
              return(
                <tr key = {vacancy.id}>
                  <td className="p-[5px] border-[2px] border-black">{vacancy.name}</td>
                  <td className="p-[5px] border-[2px] border-black">{vacancy.salary}</td>
                  <td className="p-[5px] border-[2px] border-black">{vacancy.city}</td>
                  <td className="p-[5px] border-[2px] border-black">{vacancy.experience}</td>
                  <td className="p-[5px] border-[2px] border-black">{vacancy.work_schedule}</td>
                </tr>
              )
              
            })}
          </tbody>
      </ table>
    </div>
  );
}

export default App;
