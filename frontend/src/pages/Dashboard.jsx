import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import authService from '../services/authService';
// import leaveService from '../services/leaveService'; // We will use this soon

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = authService.getCurrentUser();
  const isAdmin = user?.role === 'ROLE_ADMIN';

  // State for stats (we will fetch this from API later)
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    balance: 20
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* Main Content Area - We add a left margin equal to sidebar width on large screens */}
      <div className="flex-grow-1" style={{ marginLeft: window.innerWidth > 992 ? '260px' : '0' }}>
        <Navbar toggleSidebar={toggleSidebar} />
        
        <div className="container-fluid p-4">
          <h2 className="fw-bold mb-4" style={{ color: '#2c3e50' }}>
            {isAdmin ? 'Admin Dashboard' : 'Employee Dashboard'}
          </h2>

          <div className="row g-4 mb-4">
            {/* Stat Card 1 */}
            <div className="col-md-3">
              <div className="card shadow-sm border-0 rounded-4" style={{ borderLeft: '5px solid #00c6ff' }}>
                <div className="card-body p-4">
                  <h6 className="text-muted fw-bold mb-1">TOTAL LEAVE BALANCE</h6>
                  <h2 className="fw-bold mb-0" style={{ color: '#00c6ff' }}>{stats.balance} Days</h2>
                </div>
              </div>
            </div>
            
            {/* Stat Card 2 */}
            <div className="col-md-3">
              <div className="card shadow-sm border-0 rounded-4" style={{ borderLeft: '5px solid #f6d365' }}>
                <div className="card-body p-4">
                  <h6 className="text-muted fw-bold mb-1">PENDING REQUESTS</h6>
                  <h2 className="fw-bold mb-0" style={{ color: '#f6d365' }}>{stats.pending}</h2>
                </div>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="col-md-3">
              <div className="card shadow-sm border-0 rounded-4" style={{ borderLeft: '5px solid #00b09b' }}>
                <div className="card-body p-4">
                  <h6 className="text-muted fw-bold mb-1">APPROVED LEAVES</h6>
                  <h2 className="fw-bold mb-0" style={{ color: '#00b09b' }}>{stats.approved}</h2>
                </div>
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="col-md-3">
              <div className="card shadow-sm border-0 rounded-4" style={{ borderLeft: '5px solid #ff4b2b' }}>
                <div className="card-body p-4">
                  <h6 className="text-muted fw-bold mb-1">REJECTED LEAVES</h6>
                  <h2 className="fw-bold mb-0" style={{ color: '#ff4b2b' }}>{stats.rejected}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-white p-4 border-bottom-0">
              <h5 className="fw-bold mb-0" style={{ color: '#2c3e50' }}>Recent Activity</h5>
            </div>
            <div className="card-body p-4">
              <p className="text-muted">No recent activity found. Apply for a leave to see it here!</p>
              {/* We will add a data table here in the next step */}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
