import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './routes/About';
import HomePage from './routes/Homepage';
import Navbar from './components/navbar/Navbar';
import NotFoundPage from './routes/NotFoundPage';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import Profile from './routes/Profile';
import ProtectedRoute from './ProtectedRoute';
import Scholarships from './pages/Scholarships';
import ScholarshipPage from './routes/Scholarships/ScholarshipPage';
import SshipFormPage from './routes/Scholarships/SshipFormPage';
import { SshipProvider } from './context/SshipsContext';

function App() {
  return (
    <SshipProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/scholarships' element={<Scholarships />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute role='ADMIN' />}>
            <Route path='/becas' element={<ScholarshipPage />} />
            <Route path='/add-beca' element={<SshipFormPage />} />
            <Route path='/beca/:id' element={<SshipFormPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </SshipProvider>
  );
}

export default App;
