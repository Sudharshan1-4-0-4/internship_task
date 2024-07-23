import React from "react";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
 import "./index.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };


  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();


    const userDetails = { name, email, password };
    const url = "http://localhost:4001/register/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    console.log(response);
    if (response.ok) {
      console.log("navigated");
      navigate("/");
    } else {
      setShowSubmitError(true);
      setErrorMsg("Invalid Credentials");
    }
  };

  return (
    <div className="sign-container">
      <form className="form1-container" onSubmit={submitForm}>
        <h1 className='logo1'>Intern<span className='logo2'>Task</span></h1>
        <div className="input-container">
          <label className="input-label1" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            value={name}
            className="username-input-field"
            onChange={onChangeUsername}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label1" htmlFor="email">
            EMAIL
          </label>
          <input
            type="text"
            id="email"
            value={email}
            className="username-input-field"
            onChange={onChangeEmail}
            placeholder="Email"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            className="password-input-field"
            onChange={onChangePassword}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        <div className="signup-link-container">
        <p className="sign-link-text1">
          Already have an account?{" "}
          <Link to="/" className="signup-link">
            Login
          </Link>
        </p>
      </div>
      </form>
      
    </div>
  );
};

export default SignUp;
