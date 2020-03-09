import React from "react";
import "./style.css";
import { authorizeUser } from "../../services/fetchservice";

function login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <button
        onClick={() => {
          window.location.replace(authorizeUser());
        }}
      >
        Login
      </button>
    </div>
  );
}

export default login;
