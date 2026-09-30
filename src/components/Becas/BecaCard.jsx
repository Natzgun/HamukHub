import { useState } from 'react';

const BecaCard = ({ beca }) => {
  const [expanded, setExpanded] = useState(false);
  const date = beca.date?.slice(0, 10);

  return <article className='surface flex min-w-0 flex-col overflow-hidden'>
    <img className='h-48 w-full bg-slate-100 object-cover' src={beca.image} alt='' loading='lazy' />
    <div className='flex flex-1 flex-col p-5 sm:p-6'>
      <p className='eyebrow'>{beca.country} · {beca.continent}</p>
      <h2 className='mb-3 break-words text-xl font-bold text-slate-900'>{beca.title}</h2>
      <p className='mb-4 flex-1 whitespace-pre-line text-slate-600'>{beca.description}</p>
      {date && <p className='mb-4 text-sm font-medium text-slate-700'>Publicado el: <time dateTime={date}>{date.split('-').reverse().join('/')}</time></p>}
      {expanded && <div id={`requirements-${beca.id}`} className='mb-5 border-t border-slate-200 pt-4'>
        <h3 className='mb-2 font-semibold text-slate-900'>Requisitos</h3>
        {beca.requirements?.length ? <ul className='list-disc space-y-1 pl-5 text-slate-700'>{beca.requirements.map((item) => <li key={item.name}>{item.name}</li>)}</ul>
          : <p className='text-slate-600'>No se especificaron requisitos.</p>}
        <a href={beca.moreInfo} target='_blank' rel='noopener noreferrer' className='mt-4 inline-block font-semibold text-emerald-800 underline'>Ir a la convocatoria ↗</a>
      </div>}
      <button type='button' className='button-secondary self-start' aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}>{expanded ? 'Ocultar detalles' : 'Ver detalles y requisitos'}</button>
    </div>
  </article>;
};

export default BecaCard;
