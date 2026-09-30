import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  return <main className='page-container py-10 sm:py-16'>
    <p className='eyebrow'>Tu cuenta</p><h1 className='mb-8 text-3xl font-bold text-slate-900'>Mi perfil</h1>
    <section className='surface max-w-2xl p-6 sm:p-10' aria-label='Datos de la cuenta'>
      <div className='mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-900' aria-hidden='true'>{user.username[0].toUpperCase()}</div>
      <dl className='space-y-5'>
        <div><dt className='text-sm font-medium text-slate-600'>Usuario</dt><dd className='break-words text-lg font-semibold text-slate-900'>{user.username}</dd></div>
        <div><dt className='text-sm font-medium text-slate-600'>Correo electrónico</dt><dd className='break-all text-lg text-slate-900'>{user.email}</dd></div>
        <div><dt className='text-sm font-medium text-slate-600'>Tipo de cuenta</dt><dd className='text-lg text-slate-900'>{user.roles?.includes('ADMIN') ? 'Administración' : 'Estudiante'}</dd></div>
      </dl>
      <Link to={user.roles?.includes('ADMIN') ? '/becas' : '/scholarships'} className='button-primary mt-8 inline-block'>{user.roles?.includes('ADMIN') ? 'Gestionar becas' : 'Explorar becas'}</Link>
    </section>
  </main>;
};

export default Profile;
