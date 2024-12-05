//import PropTypes from 'prop-types'
import { useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GrLogout } from 'react-icons/gr';
import NavbarMobile from './NavbarMobile';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/logo-ti.png';
import { GlobalContext } from '../../context/Global/GlobalContext';
import NavSocialIcons from './NavSocialIcons';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { toggleClick } = useContext(GlobalContext);
  const { open } = useContext(GlobalContext);
  const { logout } = useAuth();
  //console.log(toggleClick);

  return (
    <nav className='bg-green-500 shadow-md fixed w-full flex justify-between items-center px-4 h-[65px] text-white'>
      <div>
        <img
          src={Logo}
          alt=''
          className='object-cover md:cursor-pointer h-16'
        />
      </div>
      <ul className='md:flex hidden gap-4'>
        <li className='hover:text-slate-700'>
          <NavLink to='/' className='px-3'>
            Inicio
          </NavLink>
        </li>
        <li className='hover:text-slate-700'>
          <NavLink to='/becas' className='px-3'>
            Becas
          </NavLink>
        </li>
        {/* <li className='hover:text-white'>
          <NavLink to='/jobs' className='px-3'>
            Empleos
          </NavLink>
        </li> */}
        <li className='hover:text-slate-700'>
          <NavLink to='/add-beca' className='px-3'>
            Agregar
          </NavLink>
        </li>
        <li className='hover:text-slate-700'>
          <NavLink to='/profile' className='px-3'>
            Perfil
          </NavLink>
        </li>
        {/* <li className='hover:text-white'>
          <NavLink to='/becas' className='px-3'>
            Guardados
          </NavLink>
        </li> */}
        <li className='hover:text-slate-700 flex items-center'>
            <NavLink
              to='/'
              onClick={() => {
                logout();
              }}
              className='px-3 font-bold'
            >
              Cerrar Sesión
            </NavLink>
            <GrLogout/>
        </li>
      </ul>
      {/* Hamburguer menu */}
      <div onClick={() => toggleClick()} className='md:hidden z-10 text-3xl'>
        {!open ? <FaBars /> : <FaTimes />}
      </div>
      {/* Mobile menu */}
      <NavbarMobile />
      <NavSocialIcons />
    </nav>
  );
};

//Navbar.propTypes = {};

export default Navbar;
