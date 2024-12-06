import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importamos las nuevas APIs

import Login from './modules/login';
import Dashboard from './modules/dashboard';
import Register from './modules/register';
import { AuthProvider } from './modules/authContext';
 // El panel de usuario después del login

const App = () => {
  return (
    <Router>  {/* Asegúrate de envolver toda la app con Router */}
      <AuthProvider>  {/* AuthProvider debe estar dentro de Router */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
    
  );
};

export default App;
