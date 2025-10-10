import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/UserForm.css';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    try {
      // Step 1: Register user
      const registerRes = await axios.post('http://localhost:5000/user/register', formData);

      setSuccess(registerRes.data.message || 'Registration successful! Logging you in...');

      // Step 2: Auto-login immediately after registration
      const loginRes = await axios.post('http://localhost:5000/user/login', {
        email: formData.email,
        password: formData.password
      });

      // Step 3: Store token & user info for Navbar
      localStorage.setItem('token', loginRes.data.token);
      localStorage.setItem('user', JSON.stringify(loginRes.data.user));

      // Step 4: Redirect to home page
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Create Account</h2>
        <p>Join us to book sports grounds easily</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="role">Account Type</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
            <option value="provider">Ground Provider</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Sign Up</button>
      </form>

      <div className="form-footer">
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
