import { useAuth } from './context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

// Outlet devuelve un compoinente si el usuario esta logeado
const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();
  //console.log(loading, isAuthenticated);
  if (loading) {
    return (
      <div
        data-name='login'
        className='flex h-[calc(100vh)] items-center justify-center bg-white text-gray-300'
      >
        <div className='bg-slate-200 max-w-md w-full p-10'>
          <h2 className='text-3xl mb-3 text-slate-500'>Loading...</h2>
        </div>
      </div>
    );
  }
  if (!loading && !isAuthenticated) return <Navigate to='/login' replace />;
  return <Outlet />;
};

export default ProtectedRoute;
