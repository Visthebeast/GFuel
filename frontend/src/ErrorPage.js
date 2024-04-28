import React from 'react';
import { Link } from 'react-router-dom';
function ErrorPage() {
  return (
    <div>
      <h2>Error</h2>
      <p>Oops! Something went wrong during registration.</p>
      {/* Add error details or instructions for the user */}
      <p className="login-button">Go to Login Page <Link to="/">Login</Link></p>
    </div>
  );
}

export default ErrorPage;
