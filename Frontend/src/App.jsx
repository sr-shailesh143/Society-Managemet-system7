import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RegistrationPage from './components/RegistrationPage';
import Login from './components/Login';
import ForgetScreen from './components/ForgetScreen';
import OTPVerification from './components/otp';
import ResetPassword from './components/ResetPassword';
import Layout from './Layout/Layout';
import Dashbord from './page/Dashbord';
import ProfileEditForm from './page/Profile';
import UpdateProfile from './page/UpdateProfile';
import ResidentManageMent from './page/ResidentManageMent';
import Announcement from './page/Announcement';
import SecurityGuard from './page/SecurityGuard';

import FacilityManagement from './page/FacilityManagement';

import Owner from './page/Owner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<ForgetScreen />} />
        <Route path='/otp' element={<OTPVerification />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        {/* layout */}

        <Route path='/deshbord' element={<Layout component={<Dashbord/>} />}/>
        <Route path='/resident' element={<Layout component={<ResidentManageMent/>}/>}/>
        <Route path='/FacilityManagement' element={<Layout component={<FacilityManagement/>}/>}/>
        <Route path='/SecurityGuard' element={<Layout component={<SecurityGuard/>}/>}/>

        <Route path='/financial' element={<Layout/>}/>
        {/* profile */}
        <Route path='/profileupdate' element={<Layout component={<ProfileEditForm/>} />}/>
        <Route path='/profile' element={<Layout component={<UpdateProfile/>}/>}/>
        {/* resident */}

     

        <Route path='/owner' element={<Layout component={<Owner/>} />}/>

       
        <Route path='/Announcement' element={<Layout component={<Announcement />} />} />

       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
