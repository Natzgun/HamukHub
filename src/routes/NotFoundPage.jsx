import { Link } from 'react-router-dom';

const NotFoundPage = () => <main className='page-container flex min-h-[65vh] flex-col items-start justify-center py-12'>
  <p className='eyebrow'>Error 404</p><h1 className='mb-3 text-4xl font-bold text-slate-900'>Página no encontrada</h1>
  <p className='mb-6 text-slate-600'>La dirección que buscas no existe o cambió.</p>
  <Link to='/' className='button-primary'>Volver al inicio</Link>
</main>;

export default NotFoundPage;
