import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/UserForm.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/user/login', formData);

      // ✅ Store both token & user info for Navbar to use
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // ✅ Redirect to home
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Login</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="submit-button">Sign In</button>
      </form>
      
      <div className="form-footer">
        <p>Dont have an account? <Link to="/register">Sign up</Link></p>
      </div>
    </div>
  );
}
