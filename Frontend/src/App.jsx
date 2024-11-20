import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './resident.css';

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
import Tenant from './page/Tenant';
import SecurityLayout from './Layout/SecurityLayout';
import EmergencyManagement from './page2/EmergencyManagement';

import Visitor from './page/Visitor';
import Securityprotocols from './page/Securityprotocols';
import RequestTracking from './page/RequestTracking';
import Icome from './page/Icome';
import Otherincome from './page/otheincom';

import VisitorTracking from './page2/Visitortracking';
import ServiceComplain from './page3/ServiceComplain';
import ResidentManageMentLayout from './Layout/ResidentLayout';
import PersonalDetail from './page3/PersonalDetail';
import RecidencTarent from './page3/ResidenceTarent';
import RequestSubmission from './page3/RequestSubmission';
import EventParticipation from './page3/EventParticipation';
import Activity from './page3/Activity';
import Securityprotocol2 from './page3/Securityprotocol2';
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
        <Route path='/Expense' element={<Layout component={<Expense />} />} />
        <Route path='/Otherincome' element={<Layout component={<Otherincome />} />} />
        <Route path='/Icome' element={<Layout component={<Icome />} />} />
        {/* FacilityManagement */}
        <Route path='/FacilityManagement' element={<Layout component={<FacilityManagement />} />} />
        {/* traking */}
        <Route path='/traking' element={<Layout component={<CompleteTraking />} />} />
        <Route path='/RequestTracking' element={<Layout component={<RequestTracking />} />} />
        {/* securitymanagement */}
        {/* Vistiors */}
        <Route path='/Visitor' element={<Layout component={<Visitor />} />} />
        {/* Securityprotocols */}
        <Route path='/Securityprotocols' element={<Layout component={<Securityprotocols />} />} />
        {/* SecurityGuard */}
        <Route path='/SecurityGuard' element={<Layout component={<SecurityGuard />} />} />
        {/* Announcement */}
        <Route path='/Announcement' element={<Layout component={<Announcement />} />} />
        {/* request tracking */}


        {/* Expence */}
        <Route path='/Expense' element={<Layout component={<Expense />} />} />

        {/* visirtortracking */}


        <Route path='/Financial' element={<Layout component={<Financial />} />} />

        {/* profile */}
        <Route path='/profileupdate' element={<Layout component={<ProfileEditForm />} />} />
        <Route path='/profile' element={<Layout component={<UpdateProfile />} />} />
        {/* resident */}
    
     




        {/* Security */}



        <Route path='/VisitorTracking' element={<SecurityLayout component={<VisitorTracking />} />} />
        <Route path="/EmergencyManagement" element={<SecurityLayout component={<EmergencyManagement />} />} />


        {/* ResidentManageMentLayout */}

        <Route path='/ResidentManageMent'element={<ResidentManageMentLayout component={""} />} />
        <Route path='/PersonalDetail'element={<ResidentManageMentLayout component={<PersonalDetail/>} />} />
        <Route path='/RecidencTarent'element={<ResidentManageMentLayout component={<RecidencTarent/>} />} />
        <Route path='/ServiceComplain' element={<Layout component={<ServiceComplain />} />} />
        <Route path='/RequestSubmission' element={<Layout component={<RequestSubmission />} />} />
        <Route path='/EventParticipation' element={<Layout component={<EventParticipation />} />} />
        <Route path='/Activity' element={<Layout component={<Activity />} />} />
        <Route path='/Securityprotocol2' element={<Layout component={<Securityprotocol2 />} />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
