import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalProvider } from './context/Global/GlobalProvider';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalProvider>
  </React.StrictMode>
);
