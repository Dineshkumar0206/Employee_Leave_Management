import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="card shadow-lg p-5 rounded-4" style={{ width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
        <h2 className="text-center mb-4 fw-bold" style={{ color: '#4a4a4a' }}>ELMS Login</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input 
              type="email" 
              className="form-control p-3" 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password" 
              className="form-control p-3" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/register" className="text-decoration-none fw-bold" style={{ color: '#764ba2' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
