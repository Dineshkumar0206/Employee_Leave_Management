import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import leaveService from '../services/leaveService';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [leaveData, setLeaveData] = useState({
    leaveTypeId: 1, // Default to 1 (e.g., Casual Leave)
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await leaveService.applyForLeave(leaveData);
      setMessage('Leave application submitted successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting leave application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex" style={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-grow-1" style={{ marginLeft: window.innerWidth > 992 ? '260px' : '0' }}>
        <Navbar toggleSidebar={toggleSidebar} />
        
        <div className="container-fluid p-4 d-flex justify-content-center">
          <div className="card shadow-sm border-0 rounded-4 w-100" style={{ maxWidth: '700px' }}>
            <div className="card-header bg-white p-4 border-bottom-0">
              <h4 className="fw-bold mb-0" style={{ color: '#2c3e50' }}>Apply for Leave</h4>
            </div>
            
            <div className="card-body p-4 pt-0">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold text-muted">Leave Type</label>
                  <select 
                    className="form-select p-3 bg-light border-0"
                    name="leaveTypeId"
                    value={leaveData.leaveTypeId}
                    onChange={handleChange}
                  >
                    <option value={1}>Casual Leave</option>
                    <option value={2}>Sick Leave</option>
                    <option value={3}>Earned Leave</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold text-muted">Start Date</label>
                    <input 
                      type="date" 
                      name="startDate"
                      className="form-control p-3 bg-light border-0" 
                      value={leaveData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold text-muted">End Date</label>
                    <input 
                      type="date" 
                      name="endDate"
                      className="form-control p-3 bg-light border-0" 
                      value={leaveData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-muted">Reason</label>
                  <textarea 
                    name="reason"
                    className="form-control p-3 bg-light border-0" 
                    rows="4"
                    placeholder="Briefly explain your reason for leave..."
                    value={leaveData.reason}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 p-3 fw-bold fs-5 shadow-sm"
                  disabled={loading}
                  style={{ background: 'linear-gradient(to right, #667eea, #764ba2)', border: 'none' }}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
