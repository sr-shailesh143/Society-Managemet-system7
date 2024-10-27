import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from './components/RegistrationPage';
function App() {
  return (
    <div className="App">
      <RegistrationPage />

    </div>
  );
}

export default App;
