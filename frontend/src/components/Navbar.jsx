import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg px-4 shadow-sm" style={{ backgroundColor: '#ffffff', height: '70px', zIndex: 10 }}>
      <div className="container-fluid">
        <button className="btn btn-light me-3 d-lg-none" onClick={toggleSidebar}>
          ☰
        </button>
        <span className="navbar-brand fw-bold fs-4" style={{ color: '#4a4a4a' }}>
          <span style={{ color: '#764ba2' }}>ELMS</span> Portal
        </span>
        
        <div className="collapse navbar-collapse justify-content-end">
          <div className="d-flex align-items-center">
            <span className="me-3 fw-semibold text-muted">
              Welcome, {user?.email || 'User'}
            </span>
            <div className="dropdown">
              <img 
                src="https://ui-avatars.com/api/?name=User&background=764ba2&color=fff" 
                alt="Profile" 
                className="rounded-circle dropdown-toggle" 
                style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                data-bs-toggle="dropdown"
              />
              <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                <li><button className="dropdown-item fw-semibold text-danger" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
