import BecaCard from './BecaCard';

export const ButtonCountry = ({ countries, filterCountry }) => {
  return (
    <li className='text-white'>
      {countries.map((c) => (
        <button className='p-2 hover:bg-green-500' type='button' onClick={() => filterCountry(c)} key={c}>
          {c}
        </button>
      ))}
    </li>
  );
};

export const ButtonContinent = ({ continent, filterContinent }) => {
  return (
    <li className='text-white'>
      {continent.map((c) => (
        <button className='p-2 hover:bg-yellow-500' type='button' onClick={() => filterContinent(c)} key={c}>
          {c}
        </button>
      ))}
    </li>
  );
};

export const BecaFilter = ({ scholar }) => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {scholar.map((beca) => (
        <BecaCard beca={beca} key={beca._id} />
      ))}
    </div>
  );
};
