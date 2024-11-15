import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import toast, { Toaster } from 'react-hot-toast';

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
import Financial from './page/Financial';
import Expense from './page/Expense';
import Owner from './page/Owner';
import CompleteTraking from './page/CompleteTraking';
import SecurityManagement from './page/securityManagement';

import Tenant from './page/Tenant';
import Layout2 from './Layout/Layout2';
import EmergencyManagement from './page2/EmergencyManagement';

import Visitor from './page/Visitor';
import Securityprotocols from './page/Securityprotocols';

import Icome from './page/Icome';
import Otherincome from './page/otheincom';

import VisitorTracking from './page2/Visitortracking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Registration" element={<RegistrationPage />} />
        <Route path='/' element={<Login />} />
        <Route path='/forget' element={<ForgetScreen />} />
        <Route path='/otp' element={<OTPVerification />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        {/* layout */}


        <Route path='/resident' element={<Layout component={<ResidentManageMent />} />} />



        {/* DASHBORD */}
        <Route path='/deshbord' element={<Layout component={<Dashbord />} />} />
        <Route path='/profile' element={<Layout component={<UpdateProfile />} />} />
        <Route path='/profileupdate' element={<Layout component={<ProfileEditForm />} />} />
        {/* RESIDEMT MANAGEMENT */}
        <Route path='/resident' element={<Layout component={<ResidentManageMent />} />} />
        <Route path='/owner' element={<Layout component={<Owner />} />} />
        <Route path='/Tenant' element={<Layout component={<Tenant />} />} />
        {/* financial */}
        <Route path='/Financial' element={<Layout component={<Financial />} />} />
        <Route path='/Expense' element={<Layout component={<Expense />} />}/>
        <Route path='/Otherincome' element={<Layout component={<Otherincome />} />}/>
        <Route path='/Icome' element={<Layout component={<Icome />} />}/>
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

       

        {/* Expence */}
        <Route path='/Expense' element={<Layout component={<Expense />} />} />

        {/* Vistiors */}
        <Route path='/Visitor' element={<Layout component={<Visitor />} />} />
        {/* Securityprotocols */}
        <Route path='/Securityprotocols' element={<Layout component={<Securityprotocols />} />} />
        {/* visirtortracking */}
        <Route path='/VisitorTracking' element={<Layout component={<VisitorTracking />} />} />


        <Route path='/Financial' element={<Layout component={<Financial />} />} />

        {/* profile */}
        <Route path='/profileupdate' element={<Layout component={<ProfileEditForm />} />} />
        <Route path='/profile' element={<Layout component={<UpdateProfile />} />} />
        {/* resident */}








        {/* Security */}


        <Route path="/Security" element={<Layout2 />} />
        <Route path="/EmergencyManagement" element={<Layout2 component={<EmergencyManagement />} />} />




      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
