import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importamos las nuevas APIs

import Login from './modules/login';
import Dashboard from './modules/dashboard';
import Register from './modules/register';

 // El panel de usuario después del login

const App = () => {
  return (
    <Router>  {/* Asegúrate de envolver toda la app con Router */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
    
  );
};

export default App;
