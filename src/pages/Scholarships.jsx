import { useEffect, useMemo, useState } from 'react';
import { useSships } from '../context/SshipsContext';
import BecaCard from '../components/Becas/BecaCard';

const Scholarships = () => {
  const { getBecas, becas, loading, error } = useSships();
  const [country, setCountry] = useState('');
  const [continent, setContinent] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    getBecas(controller.signal);
    return () => controller.abort();
  }, [getBecas]);

  const countries = useMemo(() => [...new Set(becas.map((beca) => beca.country))].sort(), [becas]);
  const continents = useMemo(() => [...new Set(becas.map((beca) => beca.continent))].sort(), [becas]);
  const results = becas.filter((beca) => (!country || beca.country === country) && (!continent || beca.continent === continent));

  return <main className='page-container py-10 sm:py-16'>
    <div className='mb-8 max-w-2xl'><p className='eyebrow'>Oportunidades abiertas</p>
      <h1 className='mb-3 text-3xl font-bold text-slate-900 sm:text-4xl'>Encuentra tu próxima beca</h1>
      <p className='text-slate-600'>Explora convocatorias y filtra por el lugar donde quieres estudiar.</p></div>
    <div className='surface mb-8 grid gap-4 p-5 sm:grid-cols-2'>
      <div><label htmlFor='country-filter' className='field-label'>País</label><select id='country-filter' value={country} onChange={(event) => setCountry(event.target.value)} className='field'>
        <option value=''>Todos los países</option>{countries.map((value) => <option key={value} value={value}>{value}</option>)}
      </select></div>
      <div><label htmlFor='continent-filter' className='field-label'>Continente</label><select id='continent-filter' value={continent} onChange={(event) => setContinent(event.target.value)} className='field'>
        <option value=''>Todos los continentes</option>{continents.map((value) => <option key={value} value={value}>{value}</option>)}
      </select></div>
    </div>
    {error && <div role='alert' className='error-box mb-6'>{error} <button type='button' className='font-semibold underline' onClick={() => getBecas()}>Reintentar</button></div>}
    {loading ? <p role='status'>Cargando oportunidades…</p> : !error && <>
      <p className='mb-5 text-sm font-medium text-slate-600'>{results.length} {results.length === 1 ? 'beca disponible' : 'becas disponibles'}</p>
      {results.length ? <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>{results.map((beca) => <BecaCard key={beca.id} beca={beca} />)}</div>
        : <div className='surface p-8 text-slate-700'>No hay becas para estos filtros. Prueba con otro país o continente.</div>}
    </>}
  </main>;
};

export default Scholarships;
