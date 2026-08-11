import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/motion/SmoothScroll';
import CustomCursor from './components/motion/CustomCursor';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import StudentCheckIn from './pages/StudentCheckIn';
import CounselorDashboard from './pages/CounselorDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <SmoothScroll>
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/student/check-in" 
              element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <StudentCheckIn />
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
        </SmoothScroll>
      </Router>
    </AuthProvider>
  );
}

export default App;
