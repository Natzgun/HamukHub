import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors: fieldErrors, isSubmitting } } = useForm();
  const { isAuthenticated, loading, signup, errors, clearErrors } = useAuth();
  const navigate = useNavigate();
  if (isAuthenticated) return <Navigate to='/profile' replace />;

  const onSubmit = handleSubmit(async (values) => {
    if (await signup(values)) navigate('/login', { state: { registered: true } });
  });

  return <main className='page-container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12'>
    <div className='surface w-full max-w-md p-6 sm:p-10'>
      <p className='eyebrow'>Únete a Hamuk</p>
      <h1 className='mb-2 text-3xl font-bold text-slate-900'>Crear cuenta</h1>
      <p className='mb-6 text-slate-600'>Regístrate y descubre nuevas oportunidades de estudio.</p>
      {errors.length > 0 && <div role='alert' className='error-box'>{errors.join(' ')}</div>}
      <form onSubmit={onSubmit} className='space-y-5'>
        <div><label htmlFor='register-username' className='field-label'>Usuario</label>
          <input id='register-username' autoComplete='username' className='field' {...register('username', { required: true })} />
          {fieldErrors.username && <p className='field-error'>Ingresa un usuario.</p>}</div>
        <div><label htmlFor='register-email' className='field-label'>Correo electrónico</label>
          <input id='register-email' type='email' autoComplete='email' className='field' {...register('email', { required: true })} />
          {fieldErrors.email && <p className='field-error'>Ingresa un correo válido.</p>}</div>
        <div><label htmlFor='register-password' className='field-label'>Contraseña</label>
          <input id='register-password' type='password' autoComplete='new-password' className='field' {...register('password', { required: true })} />
          {fieldErrors.password && <p className='field-error'>Ingresa una contraseña.</p>}</div>
        <button disabled={loading || isSubmitting} type='submit' className='button-primary w-full'>{isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}</button>
      </form>
      <p className='mt-6 text-sm text-slate-600'>¿Ya tienes cuenta? <Link to='/login' onClick={clearErrors} className='font-semibold text-emerald-800 underline'>Inicia sesión</Link></p>
    </div>
  </main>;
};

export default RegisterPage;
