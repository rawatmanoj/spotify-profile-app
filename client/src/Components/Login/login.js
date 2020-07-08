import React from "react";
import "./login.scss";
const Login = () => {
  const LOGIN_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:8888/login"
      : "https://boiling-lowlands-64949.herokuapp.com/login";

  return (
    <div>
      <div className="login_container">
        <h1>Spotify Profile</h1>
        <a href={LOGIN_URI}>
          <button size="lg" variant="success">
            LOG IN WITH SPOTIFY
          </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
