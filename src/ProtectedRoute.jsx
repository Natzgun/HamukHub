import { useAuth } from './context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
  const { loading, isAuthenticated, user } = useAuth();
  const location = useLocation();
  if (loading) return <main className='page-container py-32' role='status'>Cargando sesión…</main>;
  if (!isAuthenticated) return <Navigate to='/login' state={{ from: location }} replace />;
  if (role && !user.roles?.includes(role)) return <Navigate to='/scholarships' replace />;
  return <Outlet />;
};

export default ProtectedRoute;
