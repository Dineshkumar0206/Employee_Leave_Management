import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="card shadow-lg p-5 rounded-4" style={{ width: '450px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <h2 className="text-center mb-4 fw-bold" style={{ color: '#4a4a4a' }}>Create Account</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input 
                type="text" 
                name="firstName"
                className="form-control p-3" 
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                className="form-control p-3" 
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input 
              type="email" 
              name="email"
              className="form-control p-3" 
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password" 
              name="password"
              className="form-control p-3" 
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100 p-3 fw-bold fs-5 shadow-sm"
            disabled={loading}
            style={{ background: 'linear-gradient(to right, #667eea, #764ba2)', border: 'none' }}
          >
            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted">Already have an account? </span>
          <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#764ba2' }}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
