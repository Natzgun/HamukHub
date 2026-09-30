import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSships } from '../../context/SshipsContext';
import { toFormValues, toScholarshipRequest } from './scholarshipForm';

const SshipFormPage = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { requirements: '' },
  });
  const { createBeca, getBeca, actualizarBeca } = useSships();
  const { id } = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!!id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    setLoading(true);
    getBeca(id, controller.signal).then((beca) => {
      if (!controller.signal.aborted) reset(toFormValues(beca));
    }).catch((err) => { if (!controller.signal.aborted) setError(err.message); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id, getBeca, reset]);

  const onSubmit = handleSubmit(async (values) => {
    setError('');
    const payload = toScholarshipRequest(values);
    try {
      if (id) await actualizarBeca(id, payload);
      else await createBeca(payload);
      navigate('/becas');
    } catch (err) {
      setError(err.message);
    }
  });

  if (loading) return <main className='page-container py-16' role='status'>Cargando beca…</main>;

  return <main className='page-container py-10 sm:py-16'>
    <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
      <div><p className='eyebrow'>Administración</p><h1 className='text-3xl font-bold text-slate-900'>{id ? 'Editar beca' : 'Nueva beca'}</h1></div>
      <Link className='button-secondary' to='/becas'>Volver a becas</Link>
    </div>
    <form onSubmit={onSubmit} className='surface grid gap-5 p-5 sm:grid-cols-2 sm:p-8'>
      {error && <div role='alert' className='error-box sm:col-span-2'>{error}</div>}
      <div><label className='field-label' htmlFor='title'>Título</label><input id='title' className='field' {...register('title', { required: true })} />{errors.title && <p className='field-error'>El título es obligatorio.</p>}</div>
      <div className='sm:col-span-2'><label className='field-label' htmlFor='description'>Descripción</label><textarea id='description' rows='4' className='field' {...register('description', { required: true })} />{errors.description && <p className='field-error'>La descripción es obligatoria.</p>}</div>
      <div><label className='field-label' htmlFor='image'>URL de imagen</label><input id='image' type='url' className='field' {...register('image', { required: true })} />{errors.image && <p className='field-error'>La URL de imagen es obligatoria.</p>}</div>
      <div><label className='field-label' htmlFor='moreInfo'>Enlace de la convocatoria</label><input id='moreInfo' type='url' className='field' {...register('moreInfo', { required: true })} />{errors.moreInfo && <p className='field-error'>El enlace es obligatorio.</p>}</div>
      <div><label className='field-label' htmlFor='country'>País</label><input id='country' className='field' {...register('country', { required: true })} />{errors.country && <p className='field-error'>El país es obligatorio.</p>}</div>
      <div><label className='field-label' htmlFor='continent'>Continente</label><input id='continent' className='field' {...register('continent', { required: true })} />{errors.continent && <p className='field-error'>El continente es obligatorio.</p>}</div>
      <div className='sm:col-span-2'><label className='field-label' htmlFor='requirements'>Requisitos (uno por línea)</label>
        <textarea id='requirements' rows='4' className='field' {...register('requirements')} placeholder='Ejemplo: Constancia de estudios' />
        <p className='mt-1 text-sm text-slate-600'>Deja este campo vacío si no hay requisitos.</p></div>
      <div className='sm:col-span-2'><button className='button-primary' type='submit' disabled={isSubmitting}>{isSubmitting ? 'Guardando…' : id ? 'Guardar cambios' : 'Publicar beca'}</button></div>
    </form>
  </main>;
};

export default SshipFormPage;
