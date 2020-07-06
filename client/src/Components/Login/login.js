import React from "react";
import "./login.scss";
const Login = () => {
  return (
    <div>
      <div className="login_container">
        <h1>Spotify Profile</h1>
        <a href="http://localhost:8888/login">
          {" "}
          <button size="lg" variant="success">
            login with Spotify
          </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
