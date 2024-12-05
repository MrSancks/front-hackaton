import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importamos las nuevas APIs

import Login from './modules/login';
import Dashboard from './modules/dashboard';
import Register from './modules/register';
 // El panel de usuario después del login

const App = () => {
  return (
    <Router> {/* El Router debe envolver la aplicación */}
      <Routes> {/* Usamos Routes en lugar de Switch */}
        <Route path="/login" element={<Login />} /> {/* Definimos las rutas con element */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
