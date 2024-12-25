import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, signin, user, errors: signinErrors } = useAuth();

  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user.email !== 'erickmalcoaccha@gmail.com') {
      navigation('/scholarships');
    } else if (isAuthenticated && user.email == 'erickmalcoaccha@gmail.com') { 
      navigation('/profile');
    }
  }, [isAuthenticated]);

  const onSubmitReg = handleSubmit((values) => {
    signin(values);
  });
  return (
    <div
      data-name='login'
      className='flex h-[calc(100vh)] items-center justify-center bg-slate-50 text-gray-300'
    >
      <div className='bg-white max-w-md w-full p-10 rounded-lg shadow-xl'>
        <h2 className='text-3xl mb-3 text-slate-500 font-bold'>Login</h2>
        {signinErrors.map((error, i) => (
          <div className='bg-red-500 p-2 my-2' key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmitReg}>
          <input
            type='name'
            {...register('username', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Username'
          ></input>
          {errors.username && <p className='text-red-500'>Username es requerido</p>}

          <input
            type='password'
            {...register('password', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Contraseña'
          ></input>
          {errors.password && (
            <p className='text-red-500'>Contraseña es requerida</p>
          )}

          <button type='submit' className='rounded-md text-green-50 px-6 py-3 my-2 flex items-center bg-green-500 hover:bg-green-600'>
            Inciar Sesión
          </button>
        </form>
        <p className='flex gap-x-2 justify-between'>
          No tienes una cuenta? <Link to='/register' className='text-sky-500'>Registrate</Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
