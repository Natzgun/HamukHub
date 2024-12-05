import { useEffect, useState } from 'react';
import { useSships } from '../context/SshipsContext';
import { BecaFilter, ButtonContinent, ButtonCountry } from '../components/Becas/BecaFilter';

const Scholarships = () => {
  const { getBecas, becas } = useSships();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isColumn1Visible, setColumn1Visible] = useState(false);
  const [isColumn2Visible, setColumn2Visible] = useState(false);

  // Estas funciones son para hacer el filtro hasta antes de getBecas
  const [countries, setCountries] = useState([]);
  const [continent, setContinent] = useState([]);
  const [scholar, setScholar] = useState(becas);

  const filterCountry = (country) => {
    if (country === "All") {
      setScholar(becas);
      return;
    }
    const filteredData = becas.filter(article => article.country === country);
		setScholar(filteredData);
  };

  const filterContinent = (continent) => {
    if (continent === "All") {
      setScholar(becas);
      return;
    }
    const filteredData = becas.filter(article => article.continent === continent);
		setScholar(filteredData);
  };

  useEffect(() => {
    const allCountries = [
      'All',
      ...new Set(becas.map((card) => card.country)),
    ];
    const allContinents = [
      'All',
      ...new Set(becas.map((card) => card.continent)),
    ];
    setContinent(allContinents);
    setCountries(allCountries);
    setScholar(becas);
  }, [becas])

  useEffect(() => {
    getBecas();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
    setColumn1Visible(false);
    setColumn2Visible(false);
  };

  const toggleColumn1 = () => {
    setColumn1Visible((prevState) => !prevState);
    setColumn2Visible(false);
  };

  const toggleColumn2 = () => {
    setColumn2Visible((prevState) => !prevState);
    setColumn1Visible(false);
  };

  // Aqui puede agregar un if que verifique si hay o no tareas
  return (
    <div className='container mx-auto py-20 px-4'>
      <button
        onClick={toggleDropdown}
        className='p-1.5 m-0.5 rounded-lg bg-green-500 text-white hover:bg-green-600'
      >
        Filtrar resultados
      </button>
      {isDropdownVisible && (
        <div className='sm:grid sm:grid-cols-2 gap-4 items-center justify-center h-32 sm:h-20 transition-height duration-300 ease-in'>
          {/* Contenido de la barra dropdown */}
          <div
            className='bg-red-500 text-white p-4 text-center cursor-pointer rounded-lg'
            onClick={toggleColumn1}
          >
            Paises
          </div>
          <div
            className='bg-blue-500 text-white p-4 text-center cursor-pointer rounded-lg'
            onClick={toggleColumn2}
          >
            Continentes
          </div>
          {/* <div className='bg-green-500 text-white p-4 text-center' onClick={toggleColumn1}>
          <button>Columna 3</button>
          </div>
          <div className='bg-yellow-500 text-white p-4 text-center' onClick={toggleColumn1}>
          <button>Columna 4</button>
          </div> */}
        </div>
      )}

      {isColumn1Visible && (
        <div className='sm:grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 rounded-lg bg-green-400'>
          <ul>
            <ButtonCountry countries={countries} filterCountry={filterCountry}/>
          </ul>
        </div>
      )}
      {isColumn2Visible && (
        <div className='sm:grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2 rounded-lg bg-yellow-400'>
          <ul>
            <ButtonContinent continent={continent} filterContinent={filterContinent}/>
          </ul>
        </div>
      )}
      <BecaFilter scholar={scholar}/>
      
    </div>
  );
};

{
  /* <div
  data-name='login'
  className='flex h-[calc(100vh)] items-center justify-center bg-white text-gray-700'
>
  <div className='bg-slate-800 max-w-md w-full p-10'>
    <h2 className='text-7xl mb-3 text-slate-500'>Becas uwu</h2>
    {becas.map((beca) => (
      <div key={beca._id} className='bg-slate-100 my-2 p-4'>
        <h1 className='font-bold'>{beca.title}</h1>
        <p>{beca.description}</p>
      </div>
    ))}
  </div>
</div> */
}

export default Scholarships;
