//import PropTypes from 'prop-types'
import { useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import NavbarMobile from "./NavbarMobile";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo-ti.png";
import { GlobalContext } from "../../context/Global/GlobalContext";
import NavSocialIcons from "./NavSocialIcons";

const Navbar = () => {
  const { toggleClick } = useContext(GlobalContext);
  const { open } = useContext(GlobalContext);
  //console.log(toggleClick);

  return (
    <nav className="bg-[#0a192f] fixed w-full flex justify-between items-center px-4 h-[65px] text-gray-300">
      <div>
        <img
          src={Logo}
          alt=""
          className="object-cover md:cursor-pointer h-16"
        />
      </div>
      <ul className="md:flex hidden gap-4">
        <li className="hover:text-green-400">
          <NavLink to="/" className="px-3">
            Inicio
          </NavLink>
        </li>
        <li className="hover:text-green-400">
          <NavLink to="/scholarships" className="px-3">
            Becas
          </NavLink>
        </li>
        {/* <li className="hover:text-green-400">
          <NavLink to="/jobs" className="px-3">
            Laboral
          </NavLink>
        </li> */}
        <li className="hover:text-green-400">
          <NavLink to="/about" className="px-3">
            About
          </NavLink>
        </li>
        <li className="hover:text-green-400 font-bold border-2 font-bol border-green-400 rounded-md">
          <NavLink to="/login" className="px-3">
            Login
          </NavLink>
        </li>
        <li className="hover:text-green-400 border-2 rounded-md">
          <NavLink to="/register" className="px-3">
            Registro
          </NavLink>
        </li>
      </ul>
      {/* Hamburguer menu */}
      <div onClick={() => toggleClick()} className="md:hidden z-10 text-3xl">
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
