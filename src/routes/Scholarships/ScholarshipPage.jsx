import { useEffect, useState } from 'react';
import { useSships } from '../../context/SshipsContext';
import { Link } from 'react-router-dom';

const ScholarshipPage = () => {
  const { getBecas, becas, eliminarBeca, loading, error } = useSships();
  const [actionError, setActionError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    getBecas(controller.signal);
    return () => controller.abort();
  }, [getBecas]);

  const remove = async (beca) => {
    if (!window.confirm(`¿Eliminar la beca "${beca.title}"? Esta acción no se puede deshacer.`)) return;
    setActionError('');
    try { await eliminarBeca(beca.id); }
    catch (err) { setActionError(err.message); }
  };

  return <main className='page-container py-10 sm:py-16'>
    <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
      <div><p className='eyebrow'>Administración</p><h1 className='text-3xl font-bold text-slate-900'>Gestionar becas</h1></div>
      <Link className='button-primary' to='/add-beca'>Nueva beca</Link>
    </div>
    {(error || actionError) && <div role='alert' className='error-box mb-6'>{error || actionError} <button type='button' onClick={() => getBecas()} className='font-semibold underline'>Reintentar</button></div>}
    {loading ? <p role='status'>Cargando becas…</p> : becas.length === 0 && !error ? <p className='surface p-8 text-slate-700'>No hay becas publicadas. Crea la primera para empezar.</p> :
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {becas.map((beca) => <article key={beca.id} className='surface flex min-w-0 flex-col overflow-hidden'>
          <img src={beca.image} alt='' className='h-44 w-full object-cover' loading='lazy' />
          <div className='flex flex-1 flex-col p-5'><p className='eyebrow'>{beca.country} · {beca.continent}</p>
            <h2 className='mb-2 break-words text-xl font-bold text-slate-900'>{beca.title}</h2>
            <p className='mb-5 line-clamp-3 flex-1 text-slate-600'>{beca.description}</p>
            <div className='flex flex-wrap gap-3'><Link className='button-secondary' to={`/beca/${beca.id}`}>Editar</Link>
              <button type='button' className='button-danger' onClick={() => remove(beca)}>Eliminar</button></div>
          </div>
        </article>)}
      </div>}
  </main>;
};

export default ScholarshipPage;
