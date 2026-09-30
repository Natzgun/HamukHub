import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo-ti.png';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.roles?.includes('ADMIN');

  const onLogout = async () => {
    setLogoutError('');
    if (await logout()) {
      setOpen(false);
      navigate('/');
    } else {
      setLogoutError('No se pudo cerrar la sesión. Inténtalo de nuevo.');
    }
  };

  const links = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/scholarships', label: 'Becas' },
    { to: '/about', label: 'Acerca de' },
    ...(isAdmin ? [{ to: '/becas', label: 'Administrar' }, { to: '/add-beca', label: 'Nueva beca' }] : []),
    ...(user ? [{ to: '/profile', label: 'Mi perfil' }] : []),
  ];

  return (
    <header className='sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur'>
      <nav className='page-container flex min-h-16 items-center justify-between gap-4' aria-label='Navegación principal'>
        <Link to='/' className='flex items-center gap-2 text-xl font-bold text-slate-900' onClick={() => setOpen(false)}>
          <img src={Logo} alt='' className='h-12 w-12 object-contain' /> Hamuk
        </Link>
        <button type='button' className='button-secondary lg:hidden' aria-expanded={open} aria-controls='site-menu'
          onClick={() => setOpen(!open)}>{open ? 'Cerrar menú' : 'Abrir menú'}</button>
        <div id='site-menu' className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-full max-h-[calc(100vh-4rem)] flex-col gap-2 overflow-y-auto border-b border-slate-200 bg-white p-4 shadow-md lg:static lg:flex lg:max-h-none lg:flex-row lg:items-center lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
          {links.map(({ to, label, end }) => <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-100'}`}>{label}</NavLink>)}
          {!loading && (user ? <button type='button' onClick={onLogout} className='button-secondary'>Cerrar sesión</button>
            : <><Link to='/login' onClick={() => setOpen(false)} className='nav-link text-slate-700'>Iniciar sesión</Link>
                <Link to='/register' onClick={() => setOpen(false)} className='button-primary text-center'>Crear cuenta</Link></>)}
          {logoutError && <p role='alert' className='text-sm text-red-700'>{logoutError}</p>}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
