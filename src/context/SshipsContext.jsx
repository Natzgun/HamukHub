import { createContext, useState, useContext, useCallback } from 'react';
import { createBecaRequest, getBecasRequest, deleteBecaRequest, getBecaRequest, updateBecaRequest } from '../api/sships';

export const ScholarshipContext = createContext();
export const useSships = () => {
  const context = useContext(ScholarshipContext);
  if (!context) throw new Error('useSships must be used within a SshipProvider');
  return context;
};

const messageFrom = (err) => {
  const data = err.response?.data;
  if (err.response?.status === 401) return 'Tu sesión terminó. Inicia sesión de nuevo.';
  if (err.response?.status === 403) return 'No tienes permiso para esta acción. Inicia sesión con una cuenta administradora.';
  return typeof data === 'string' && data.trim() ? data : 'No se pudo completar la operación. Inténtalo de nuevo.';
};

export function SshipProvider({ children }) {
  const [becas, setBecas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getBecas = useCallback(async (signal) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getBecasRequest(signal);
      if (!signal?.aborted) setBecas(data);
    } catch (err) {
      if (!signal?.aborted) setError(messageFrom(err));
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  const createBeca = async (beca) => {
    try {
      const { data } = await createBecaRequest(beca);
      setBecas((current) => [...current, data]);
      return data;
    } catch (err) {
      throw new Error(messageFrom(err));
    }
  };

  const eliminarBeca = async (id) => {
    try {
      await deleteBecaRequest(id);
      setBecas((current) => current.filter((beca) => beca.id !== id));
    } catch (err) {
      throw new Error(messageFrom(err));
    }
  };

  const getBeca = useCallback(async (id, signal) => {
    try {
      const { data } = await getBecaRequest(id, signal);
      return data;
    } catch (err) {
      if (signal?.aborted) return;
      throw new Error(messageFrom(err));
    }
  }, []);

  const actualizarBeca = async (id, beca) => {
    try {
      const { data } = await updateBecaRequest(id, beca);
      setBecas((current) => current.map((item) => item.id === id ? data : item));
      return data;
    } catch (err) {
      throw new Error(messageFrom(err));
    }
  };

  return (
    <ScholarshipContext.Provider value={{ becas, loading, error, createBeca, getBecas, eliminarBeca, getBeca, actualizarBeca }}>
      {children}
    </ScholarshipContext.Provider>
  );
}
