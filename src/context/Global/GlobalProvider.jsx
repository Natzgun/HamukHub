import { GlobalContext } from "./GlobalContext";
import { useState } from "react";

/*Se inicializa el estado incial, la propiedad GlobalState
 * se encuentra en interfaces
 * const INITIAL_STATE: GlobalState = {
 *
 * }*/


export const GlobalProvider = ({ children }) => {
  /* Funcion para activar o desactivar algun tipo de menu */
  const [open, setOpen] = useState(false);
  const toggleClick = () => {
    setOpen(!open);
  };

  return (
    <GlobalContext.Provider value={{ open, toggleClick }}>
      {children}
    </GlobalContext.Provider>
  );
};
