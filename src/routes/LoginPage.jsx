import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors: fieldErrors, isSubmitting } } = useForm();
  const { isAuthenticated, loading, signin, errors, clearErrors } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (isAuthenticated) return <Navigate to={location.state?.from || '/profile'} replace />;

  const onSubmit = handleSubmit(async (values) => {
    if (await signin(values)) navigate(location.state?.from || '/profile', { replace: true });
  });

  return <main className='page-container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12'>
    <div className='surface w-full max-w-md p-6 sm:p-10'>
      <p className='eyebrow'>Tu espacio</p>
      <h1 className='mb-2 text-3xl font-bold text-slate-900'>Iniciar sesión</h1>
      <p className='mb-6 text-slate-600'>Accede a tu perfil y explora las oportunidades disponibles.</p>
      {location.state?.registered && <div role='status' className='mb-5 rounded-lg bg-emerald-50 p-3 text-emerald-900'>Cuenta creada. Ya puedes iniciar sesión.</div>}
      {errors.length > 0 && <div role='alert' className='error-box'>{errors.join(' ')}</div>}
      <form onSubmit={onSubmit} className='space-y-5'>
        <div><label htmlFor='login-username' className='field-label'>Usuario</label>
          <input id='login-username' autoComplete='username' className='field' {...register('username', { required: true })} />
          {fieldErrors.username && <p className='field-error'>Ingresa tu usuario.</p>}</div>
        <div><label htmlFor='login-password' className='field-label'>Contraseña</label>
          <input id='login-password' type='password' autoComplete='current-password' className='field' {...register('password', { required: true })} />
          {fieldErrors.password && <p className='field-error'>Ingresa tu contraseña.</p>}</div>
        <button disabled={loading || isSubmitting} type='submit' className='button-primary w-full'>{isSubmitting ? 'Ingresando…' : 'Ingresar'}</button>
      </form>
      <p className='mt-6 text-sm text-slate-600'>¿No tienes una cuenta? <Link to='/register' onClick={clearErrors} className='font-semibold text-emerald-800 underline'>Regístrate</Link></p>
    </div>
  </main>;
};

export default LoginPage;
