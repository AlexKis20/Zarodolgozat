import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './Navbar';
import Termekek from './Termekek/Termekek';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Termekek />} />
          <Route path="/termekek" element={<Termekek />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
