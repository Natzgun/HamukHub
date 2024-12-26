import { useForm } from 'react-hook-form';
import { useSships } from '../../context/SshipsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const SshipFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { beca, createBeca, getBeca, actualizarBeca } = useSships();
  const navigate = useNavigate();
  const params = useParams();
  //console.log(beca);

  useEffect(() => {
    const loadBeca = async () => {
      if (params.id) {
        const sship = await getBeca(params.id);
        setValue('title', sship.title);
        setValue('description', sship.description);
        setValue(
          'date',
          sship.date ? dayjs(sship.date).utc().format('YYYY-MM-DD') : ''
        );
        setValue('country', sship.country);
        setValue('continent', sship.continent);
        setValue('moreInfo', sship.moreInfo);
        setValue('image', sship.image);
        setValue('completed', sship.completed);
      }
    };
    loadBeca();
  }, []);

  const onSubmitReg = handleSubmit((data) => {
    console.log(data);
    if (params.id) {
      actualizarBeca(params.id, {
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    } else {
      createBeca({
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    }
    navigate('/becas');
  });

  return (
    <div className='container mx-auto py-20 px-8 md:px-16 bg-white text-gray-500'>
      <h2 className='text-3xl mb-8 text-slate-500 lg:px-12'>Formulario beca</h2>

      <form
        onSubmit={onSubmitReg}
        className='bg-white grid md:grid-cols-2 gap-6'
      >
        <div className='lg:px-12'>
          <label htmlFor='title'>Titulo</label>
          <input
            type='text'
            {...register('title', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Titulo'
            autoFocus
          ></input>
          {/* {errors.email && <p className='text-red-500'>Email es requerido</p>} */}

          <label htmlFor='description'>Descripcion</label>
          <textarea
            rows='3'
            {...register('description', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Descripcion'
          ></textarea>
          {/* {errors.password && (
            <p className='text-red-500'>Contraseña es requerida</p>
          )} */}
          <label htmlFor='image'>Imagen</label>
          <input
            type='text'
            {...register('image', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Url de la imagen'
            autoFocus
          ></input>
          <label htmlFor='date'>Fecha</label>
          <input
            type='date'
            {...register('date', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
          />
        </div>
        <div>
          <label htmlFor='category'>País</label>
          <input
            type='text'
            {...register('country', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Escriba aqui el pais'
            autoFocus
          ></input>

          <label htmlFor='continent'>Continente</label>
          <input
            type='text'
            {...register('continent', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Escriba aqui el continente'
            autoFocus
          ></input>

          <label htmlFor='moreInfo'>Informacion externa</label>
          <input
            type='text'
            {...register('moreInfo', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Link de la pagina externa'
            autoFocus
          ></input>
          <button className='rounded-md text-green-50 px-6 py-3 my-2 flex items-center bg-green-500 hover:bg-green-600'>
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SshipFormPage;
