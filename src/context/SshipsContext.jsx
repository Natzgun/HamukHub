import { createContext, useState, useContext } from 'react';
import {
  createBecaRequest,
  getBecasRequest,
  deleteBecaRequest,
  getBecaRequest,
  updateBecaRequest
} from '../api/sships';

export const ScholarshipContext = createContext();
export const useSships = () => {
  const context = useContext(ScholarshipContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export function SshipProvider({ children }) {
  const [becas, setBeca] = useState([]);

  const createBeca = async (beca) => {
    try {
      const res = await createBecaRequest(beca);
      // Este if deberi actualizar la lista de becas supuestamente
      // if (res.status === 204) setBeca(becas.filter((newBeca) => newBeca._id !== beca._id));
    } catch (error) {
      console.log(error);
    }
  };

  const getBecas = async () => {
    try {
      const res = await getBecasRequest();
      setBeca(res.data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarBeca = async (id) => {
    try {
      const res = await deleteBecaRequest(id);
      if (res.status === 204) setBeca(becas.filter((beca) => beca.id !== id));
      alert('Beca eliminada');
    } catch (error) {
      console.log(error);
    }
  };

  const getBeca = async (id) => {
    try {
      const res = await getBecaRequest(id);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarBeca = async (id, beca) => {
    try {
      await updateBecaRequest(id, beca);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScholarshipContext.Provider
      value={{
        becas,
        createBeca,
        getBecas,
        eliminarBeca,
        getBeca,
        actualizarBeca,
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
}
