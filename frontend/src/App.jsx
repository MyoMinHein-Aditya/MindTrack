import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/motion/SmoothScroll';
import CustomCursor from './components/motion/CustomCursor';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MindBridgeChat from './components/Chat/MindBridgeChat';

// Pages
import Landing from './pages/Landing';
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import StudentCheckIn from './pages/StudentCheckIn';
import ResourceHub from './pages/ResourceHub';
import CounselorDashboard from './pages/CounselorDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <SmoothScroll>
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/check-in" 
              element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <StudentCheckIn />
              } 
            />
            <Route 
              path="/student/resources" 
              element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <ResourceHub />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/counselor/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['COUNSELOR']}>
                  <CounselorDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <MindBridgeChat />
        </SmoothScroll>
      </Router>
    </AuthProvider>
  );
}

export default App;
