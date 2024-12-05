import { Key } from "react";
import { NavLink } from "react-router-dom";

export const NavbarLinks = () => {
  const directions = ["Inicio", "About", "Experience", "Contact"];
  const routes = [""];
  return (
    <li className="py-4">
      {directions.map((names, index) => {
        return (
          <NavLink to={"/about"} key={index}>
            {names}
          </NavLink>
        );
      })}
    </li>
  );
};
