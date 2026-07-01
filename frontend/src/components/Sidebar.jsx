import React from 'react';
import { NavLink } from 'react-router-dom';
import authService from '../services/authService';

const Sidebar = ({ isOpen }) => {
  const user = authService.getCurrentUser();
  const isAdmin = user?.role === 'ROLE_ADMIN';

  const linkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    borderLeft: isActive ? '4px solid #fff' : '4px solid transparent',
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    padding: '15px 20px',
    transition: 'all 0.3s'
  });

  return (
    <div 
      className={`sidebar text-white shadow-lg ${isOpen ? 'd-block' : 'd-none d-lg-block'}`} 
      style={{ 
        width: '260px', 
        minHeight: '100vh', 
        background: 'linear-gradient(180deg, #1e1e2d 0%, #2d2d44 100%)',
        position: 'fixed',
        zIndex: 20
      }}
    >
      <div className="p-4 border-bottom border-secondary mb-3">
        <h5 className="mb-0 fw-bold tracking-wide">NAVIGATION</h5>
      </div>
      
      <div className="d-flex flex-column">
        <NavLink to="/dashboard" style={linkStyle}>
          📊 Dashboard
        </NavLink>
        
        {/* Employee Only Links */}
        {!isAdmin && (
          <>
            <NavLink to="/apply-leave" style={linkStyle}>
              ✉️ Apply Leave
            </NavLink>
            <NavLink to="/my-leaves" style={linkStyle}>
              📜 Leave History
            </NavLink>
          </>
        )}

        {/* Admin Only Links */}
        {isAdmin && (
          <>
            <NavLink to="/manage-leaves" style={linkStyle}>
              ✅ Pending Requests
            </NavLink>
            <NavLink to="/manage-employees" style={linkStyle}>
              👥 Employees
            </NavLink>
            <NavLink to="/reports" style={linkStyle}>
              📈 Reports
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
