import { Link } from 'react-router-dom';
import backgroundImage from '../../img/CLEI.webp';

const Welcome = () => <section className='relative flex min-h-[min(720px,85vh)] items-center bg-slate-950 bg-cover bg-center py-20 text-white' style={{ backgroundImage: `linear-gradient(90deg, rgba(4,20,35,.92), rgba(4,20,35,.48)), url(${backgroundImage})` }}>
  <div className='page-container relative w-full'>
    <p className='mb-4 text-sm font-bold uppercase tracking-widest text-emerald-300'>Tu futuro empieza aquí</p>
    <h1 className='max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl'>Un mundo de oportunidades a tu alcance</h1>
    <p className='mt-6 max-w-xl text-lg leading-relaxed text-slate-100'>Explora becas, conoce sus requisitos y encuentra la oportunidad que acompaña tus metas.</p>
    <Link to='/scholarships' className='button-primary mt-8 inline-block'>Explorar becas →</Link>
  </div>
</section>;

export default Welcome;
