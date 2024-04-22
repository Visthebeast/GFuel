import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css'; // Import CSS file for styling

function StartPage() {
    const navigate = useNavigate(); // React Router's navigation hook

  const handleAdminLogin = () => {
    // Navigate to the login page for admin
    navigate('/admin-login');
  }
  
  const handleUserLogin = () => {
      // Navigate to the login page for admin
      navigate('/user-login');

  }
  return (
    <div className="front-page-container">
      <h1 className="page-heading">G-Fuel</h1>
      <div className="button-container">
        <button className="login-button admin" onClick={handleAdminLogin}>Admin Login</button>
        <button className="login-button user" onClick={handleUserLogin}>User Login</button>
      </div>
    </div>
  );
}

export default StartPage;
