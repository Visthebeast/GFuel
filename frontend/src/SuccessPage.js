import React from 'react';
//import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SuccessPage() {
  return (
    <div>
      <h2>Registration Successful!</h2>
      <p>Your account has been created successfully.</p>
      {/* Add additional content or actions here */}
      <p className="login-button">Go to Login Page <Link to="/">Login</Link></p>
    </div>
  );
}

export default SuccessPage;
