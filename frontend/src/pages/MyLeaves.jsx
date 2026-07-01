import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MyLeaves = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Dummy data for now until we hook up the GET /api/leaves endpoint
  const leaveHistory = [
    { id: 1, type: 'Casual Leave', startDate: '2026-07-01', endDate: '2026-07-05', days: 5, status: 'APPROVED' },
    { id: 2, type: 'Sick Leave', startDate: '2026-08-10', endDate: '2026-08-11', days: 2, status: 'PENDING' },
    { id: 3, type: 'Earned Leave', startDate: '2025-12-20', endDate: '2025-12-31', days: 12, status: 'REJECTED' }
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'APPROVED': return <span className="badge bg-success px-3 py-2">Approved</span>;
      case 'PENDING': return <span className="badge bg-warning text-dark px-3 py-2">Pending</span>;
      case 'REJECTED': return <span className="badge bg-danger px-3 py-2">Rejected</span>;
      default: return <span className="badge bg-secondary px-3 py-2">{status}</span>;
    }
  };

  return (
    <div className="d-flex" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-grow-1" style={{ marginLeft: window.innerWidth > 992 ? '260px' : '0' }}>
        <Navbar toggleSidebar={toggleSidebar} />
        
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0" style={{ color: '#2c3e50' }}>My Leave History</h2>
          </div>

          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3 px-4 text-muted fw-semibold border-0">Leave Type</th>
                      <th className="py-3 px-4 text-muted fw-semibold border-0">Start Date</th>
                      <th className="py-3 px-4 text-muted fw-semibold border-0">End Date</th>
                      <th className="py-3 px-4 text-muted fw-semibold border-0">Total Days</th>
                      <th className="py-3 px-4 text-muted fw-semibold border-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveHistory.map((leave) => (
                      <tr key={leave.id} style={{ verticalAlign: 'middle' }}>
                        <td className="py-3 px-4 fw-semibold text-dark">{leave.type}</td>
                        <td className="py-3 px-4 text-secondary">{leave.startDate}</td>
                        <td className="py-3 px-4 text-secondary">{leave.endDate}</td>
                        <td className="py-3 px-4 text-secondary fw-bold">{leave.days} Days</td>
                        <td className="py-3 px-4">{getStatusBadge(leave.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLeaves;
