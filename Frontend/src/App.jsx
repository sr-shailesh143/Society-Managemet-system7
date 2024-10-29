import React from 'react';
import {  BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RegistrationPage from './components/RegistrationPage';
import Login from './components/Login';
import ForgetScreen from './components/ForgetScreen';
import OTPVerification from './components/otp';
import ResetPassword from './components/ResetPassword';
import Layout from './Layout/Layout';
import Dashbord from './page/Dashbord';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<ForgetScreen/>} />
        <Route path='/otp' element={<OTPVerification />} />
        <Route path='/resetpassword' element={ <ResetPassword/>}/>
        {/* layout */}
        <Route path='/deshbord' element={<Layout component={<Dashbord/>} />}/>
        <Route path='/resident' element={<Layout/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
