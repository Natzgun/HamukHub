import { Link } from 'react-router-dom';

const About = () => <section className='page-container py-16 sm:py-24'>
  <div className='surface mx-auto max-w-3xl p-7 sm:p-12'>
    <p className='eyebrow'>Acerca de Hamuk</p>
    <h2 className='mb-5 text-3xl font-bold text-slate-900 sm:text-4xl'>Oportunidades para seguir creciendo</h2>
    <p className='mb-6 text-lg leading-relaxed text-slate-700'>Hamuk reúne convocatorias de becas en un solo lugar para ayudarte a descubrir opciones de estudio, consultar sus requisitos y acceder a la información de cada programa.</p>
    <Link to='/scholarships' className='button-primary inline-block'>Ver becas disponibles</Link>
  </div>
</section>;

export default About;
