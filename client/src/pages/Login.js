import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const res = await axios.post(
      "http://localhost:5000/login",
      {
        email,
        password,
      }
    );

     if (res.data.success) {

  localStorage.setItem("isLoggedIn", "true");

  window.location.href = "/players";

       } else {

     alert("Invalid Email or Password");

    }

  } 
  
  catch (err) {
    console.log(err);
  }
};

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleLogin}>

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;