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
import CompleteTraking from './page/CompleteTraking';
import SecurityManagement from './page/securityManagement';

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
        
        {/* DASHBORD */}
        <Route path='/deshbord' element={<Layout component={<Dashbord />} />} />
        <Route path='/profile' element={<Layout component={<UpdateProfile />} />} />
        <Route path='/profileupdate' element={<Layout component={<ProfileEditForm />} />} />
        {/* RESIDEMT MANAGEMENT */}
        <Route path='/resident' element={<Layout component={<ResidentManageMent />} />} />
        <Route path='/owner' element={<Layout component={<Owner />} />} />
        {/* financial */}
        <Route path='/financial' element={<Layout />} />
        {/* FacilityManagement */}
        <Route path='/FacilityManagement' element={<Layout component={<FacilityManagement />} />} />
        {/* traking */}
        <Route path='/traking' element={<Layout component={<CompleteTraking />} />} />
        {/* securitymanagement */}
        <Route path='/securitymanagement' element={<Layout component={<SecurityManagement />} />} />
        {/* SecurityGuard */}
        <Route path='/SecurityGuard' element={<Layout component={<SecurityGuard />} />} />
        {/* Announcement */}
        <Route path='/Announcement' element={<Layout component={<Announcement />} />} />








      </Routes>
    </BrowserRouter>
  );
}

export default App;
