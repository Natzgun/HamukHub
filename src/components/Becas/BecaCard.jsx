import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import BecaModal from './BecaModal';
import { useState } from 'react';
dayjs.extend(utc);

const BecaCard = ({ beca }) => {
  //const { toggleModal } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className='rounded-lg shadow-lg'>
      <img className='rounded-t-lg' src={beca.image} alt='' />
      <div className='p-5'>
        <h2 className='text-2xl text-slate-700 mb-3 font-bold'>{beca.title}</h2>
        <p className='text-lg font-normal mb-3 text-gray-600'>
          {beca.description}
        </p>
        <p className='text-lg font-normal mb-3 text-gray-700'>
          <label htmlFor='' className='text-green-500'>
            Disponible hasta:{' '}
          </label>
          {dayjs(beca.date).utc().format('DD/MM/YYYY')}
        </p>
        <p className='text-lg font-normal mb-3 text-gray-700'>{beca.country}</p>
        <p className='text-lg font-normal mb-3 text-gray-700'>
          {beca.continent}
        </p>

        <button
          className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
          onClick={() => handleOpenModal()}
        >
          Mas informacion
        </button>
        {openModal ? (
          <BecaModal beca={beca} onCloseModal={handleCloseModal} />
        ) : null}
      </div>
    </div>
  );
};

export default BecaCard;
