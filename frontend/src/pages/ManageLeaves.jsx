import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const ManageLeaves = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Dummy data for now
  const [pendingRequests, setPendingRequests] = useState([
    { id: 101, employeeName: 'John Doe', type: 'Sick Leave', startDate: '2026-08-10', endDate: '2026-08-11', days: 2, reason: 'Fever' },
    { id: 102, employeeName: 'Jane Smith', type: 'Casual Leave', startDate: '2026-09-01', endDate: '2026-09-05', days: 5, reason: 'Family function' }
  ]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleAction = (id, action) => {
    // In reality, this would call leaveService.updateLeaveStatus(id, action)
    setPendingRequests(pendingRequests.filter(req => req.id !== id));
    alert(`Request ${id} has been ${action}`);
  };

  return (
    <div className="d-flex" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-grow-1" style={{ marginLeft: window.innerWidth > 992 ? '260px' : '0' }}>
        <Navbar toggleSidebar={toggleSidebar} />
        
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0" style={{ color: '#2c3e50' }}>Pending Leave Requests</h2>
          </div>

          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3 px-4 text-muted fw-semibold border-0">Employee</th>
                      <th className="py-3 px-4 text-muted fw-semibold border-0">Leave Type</th>
                      <th className="py-3 px-4 text-muted fw-semibold border-0">Duration</th>
                      <th className="py-3 px-4 text-muted fw-semibold border-0">Reason</th>
                      <th className="py-3 px-4 text-muted fw-semibold border-0 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">No pending requests!</td>
                      </tr>
                    )}
                    {pendingRequests.map((req) => (
                      <tr key={req.id} style={{ verticalAlign: 'middle' }}>
                        <td className="py-3 px-4 fw-bold text-dark">{req.employeeName}</td>
                        <td className="py-3 px-4 fw-semibold text-secondary">{req.type}</td>
                        <td className="py-3 px-4 text-secondary">{req.startDate} to {req.endDate} ({req.days} days)</td>
                        <td className="py-3 px-4 text-secondary" style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{req.reason}</td>
                        <td className="py-3 px-4 text-center">
                          <button onClick={() => handleAction(req.id, 'APPROVED')} className="btn btn-sm btn-success fw-bold px-3 me-2 rounded-pill shadow-sm">Approve</button>
                          <button onClick={() => handleAction(req.id, 'REJECTED')} className="btn btn-sm btn-outline-danger fw-bold px-3 rounded-pill">Reject</button>
                        </td>
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

export default ManageLeaves;
