import React from "react";

const AuthPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <h2>Welcome to TensorGo</h2>
        <p>Sign in with Google to continue</p>
        <img
          src="/google-login.jpeg"
          alt="Google Icon"
          className="google-icon"
        />
      </div>
    </div>
  );
};

export default AuthPage;
