import { HiArrowNarrowRight } from 'react-icons/hi';
import backgroundImage from '../../img/CLEI.webp';

// Aqui tiene que ir una etiqueta de imagen como fondo
const Welcome = () => {
  return (
    <section
      className='w-full h-screen bg-no-repeat bg-center bg-cover bg-blend-overlay bg-fixed'
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      {/* Container */}
      <div className='max-w-[1000px] mx-auto px-10 md:px-20 lg:px-10 flex flex-col justify-center h-full'>
        <span className=' text-green-400 py-2'>
          Explora tu potencial, desafía tus límites
        </span>
        <h1 className='text-slate-50 text-4xl sm:text-7xl font-bold'>Hamuk 2.0</h1>
        <h2 className='text-3xl sm:text-5xl font-bold text-slate-100'>
          El pasaporte hacia un mundo de oportunidades
        </h2>
        <p className='py-4 text-slate-100 max-w-[700px]'>
          "Las becas son puentes de oportunidad que abren las puertas del
          conocimiento y empoderamiento, brindando a aquellos que las aprovechan
          la posibilidad de forjar un futuro brillante y alcanzar sus metas más
          allá de cualquier barrera económica."
        </p>
        <div>
          <button className='border-2 group text-green-100 px-12 py-3 my-4 flex items-center hover:bg-green-600'>
            Works
            <span className='group-hover:rotate-90 duration-300'>
              <HiArrowNarrowRight className='ml-2' />
            </span>
          </button>
        </div>
        {/*<div className="bg-slate-300 hidden sm:block">logo personal</div>*/}
      </div>
    </section>
  );
};

export default Welcome;
