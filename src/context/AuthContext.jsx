import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, logoutRequest, verifyTokenRequest } from '../api/auth';
import api from '../api/axios';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const messageFrom = (error, fallback) => {
  const data = error.response?.data;
  if (typeof data === 'string' && data.trim()) return data;
  if (typeof data?.message === 'string') return data.message;
  if (error.response?.status === 401) return 'Usuario o contraseña incorrectos.';
  return fallback;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && error.config?.url !== '/users/login') {
          setUser(null);
          if (error.config?.url !== '/users/verifyToken') {
            setErrors(['Tu sesión terminó. Inicia sesión de nuevo.']);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  const signup = async (values) => {
    setErrors([]);
    try {
      await registerRequest(values);
      return true;
    } catch (error) {
      setErrors([messageFrom(error, 'No se pudo crear la cuenta. Inténtalo de nuevo.')]);
      return false;
    }
  };

  const signin = async (values) => {
    setErrors([]);
    try {
      const response = await loginRequest(values);
      setUser(response.data);
      return true;
    } catch (error) {
      setErrors([messageFrom(error, 'No se pudo iniciar sesión. Inténtalo de nuevo.')]);
      return false;
    }
  };

  const logout = async () => {
    setErrors([]);
    try {
      await logoutRequest();
      setUser(null);
      return true;
    } catch (error) {
      setErrors([messageFrom(error, 'No se pudo cerrar la sesión. Inténtalo de nuevo.')]);
      return false;
    }
  };

  useEffect(() => {
    let active = true;
    verifyTokenRequest()
      .then(({ data }) => { if (active) setUser(data); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <AuthContext.Provider value={{ logout, loading, signup, signin, user, isAuthenticated: !!user, errors, clearErrors: () => setErrors([]) }}>
      {children}
    </AuthContext.Provider>
  );
};
