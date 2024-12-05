import { Route, Routes } from 'react-router-dom';
import About from './routes/About';
import Contact from './routes/Contact';
import Experience from './routes/Experience';
import HomePage from './routes/Homepage';
import Navbar from './components/navbar/Navbar';
import AuthNavbar from './components/navbar/AuthNavDesk';
import AdminNavbar from './components/navbar/AdminNavDesk';
import NotFoundPage from './routes/NotFoundPage';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import TaskFormPage from './routes/Tasks/TaskFormPage';
import Profile from './routes/Profile';
import ProtectedRoute from './ProtectedRoute';
import TasksPage from './routes/Tasks/TasksPage';
import { useAuth } from './context/AuthContext';
import Scholarships from './pages/Scholarships';
import Jobs from './pages/Jobs';
import ScholarshipPage from './routes/Scholarships/ScholarshipPage';
import SshipFormPage from './routes/Scholarships/SshipFormPage';
import { SshipProvider } from './context/SshipsContext';

function App() {
  const { isAuthenticated, user, loading } = useAuth();
  let navbarComponent;
  let routes;
  if (loading) {
    return (
      <div
        data-name='login'
        className='flex h-[calc(100vh)] items-center justify-center bg-white text-gray-300'
      >
        <div className='bg-slate-200 max-w-md w-full p-10 rounded-xl'>
          <h2 className='text-3xl mb-3 text-slate-500'>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navbarComponent = <Navbar />;
    routes = (
      <>
        <Route element={<ProtectedRoute />}>
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/add-task' element={<TaskFormPage />} />
          <Route path='/tasks/:id' element={<TaskFormPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/becas' element={<ScholarshipPage />} />
          <Route path='/add-beca' element={<SshipFormPage />} />
          <Route path='/beca/:id' element={<SshipFormPage />} />
          <Route path='/profile' element={<Profile />} />1
        </Route>
      </>
    );
  } else if (isAuthenticated && user.email == 'erickmalcoaccha@gmail.com') {
    navbarComponent = <AdminNavbar />;
    routes = (
      <>
        <Route element={<ProtectedRoute />}>
          <Route path='/becas' element={<ScholarshipPage />} />
          <Route path='/add-beca' element={<SshipFormPage />} />
          <Route path='/beca/:id' element={<SshipFormPage />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </>
    );
  } else {
    navbarComponent = <AuthNavbar />;
    routes = (
      <>
        <Route element={<ProtectedRoute />}>
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/add-task' element={<TaskFormPage />} />
          <Route path='/tasks/:id' element={<TaskFormPage />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </>
    );
  }
  return (
    <>
      <SshipProvider>
        <BrowserRouter>
          {/* {isAuthenticated ? <AuthNavbar /> : <Navbar />} */}
          {navbarComponent}
          <Routes>
            {routes}
            <Route path='/scholarships' element={<Scholarships />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/Experience' element={<Experience />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </SshipProvider>
    </>
  );
}

export default App;
