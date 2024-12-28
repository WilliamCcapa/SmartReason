import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './pages/Clientes';

const App = () => (
  <Router>
    <Routes>
      <Route path="/clientes" element={<Clientes />} />
    </Routes>
  </Router>
);

export default App;
