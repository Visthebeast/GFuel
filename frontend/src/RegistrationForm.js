import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './RegistrationForm.css'; // Import the CSS file for the component

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // React Router's navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
    console.log('Form submitted with data:', formData);
    // Navigate to SuccessPage
    navigate('/success');
  };

  //const goToLoginPage = () => {
    //navigate('/login');
  //};

  return (
    <div className="registration-form-container">
      <h2 className="form-heading">Create an Account</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="form-button">Register</button>
      </form>
      <p className="login-button">Already have an account? Login <Link to="/">Login</Link></p>
    </div>
  );
}

export default RegistrationForm;
