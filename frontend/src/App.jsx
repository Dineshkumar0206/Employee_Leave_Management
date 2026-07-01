import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import authService from './services/authService';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ApplyLeave from './pages/ApplyLeave';
import MyLeaves from './pages/MyLeaves';
import ManageLeaves from './pages/ManageLeaves';

// Placeholder Pages
const Unauthorized = () => <h2>401 Unauthorized</h2>;

// PrivateRoute Component to protect internal pages
const PrivateRoute = ({ children, roles }) => {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute roles={['ROLE_EMPLOYEE', 'ROLE_ADMIN']}>
                <Dashboard />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/apply-leave" 
            element={
              <PrivateRoute roles={['ROLE_EMPLOYEE']}>
                <ApplyLeave />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/my-leaves" 
            element={
              <PrivateRoute roles={['ROLE_EMPLOYEE']}>
                <MyLeaves />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/manage-leaves" 
            element={
              <PrivateRoute roles={['ROLE_ADMIN']}>
                <ManageLeaves />
              </PrivateRoute>
            } 
          />
          
          {/* Default redirect to dashboard or login */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
