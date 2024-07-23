import React, {  useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './index1.css';

const LoginForm = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = () => {
  
    navigate("/home"); 
  };

  

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { name, password };
    const apiUrl = 'http://localhost:4001/login/';
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok) {
      
      console.log(data.jwtToken);
      onSubmitSuccess();
    } else {
      console.log("err");
      setShowSubmitError(true);
      setErrorMsg("Invalid Credentials");
      setPassword("");
      setUsername("");
    }
  };

  
  return (
    <div className="login-container1">
      
      <form className="form-container" onSubmit={submitForm}>
        <h1 className='logo'>Intern <span className='logo2'>Task</span></h1>
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
          <label className="input-label1" htmlFor="password">
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

        {showSubmitError && <p className="error-message1">*{errorMsg}</p>}
        <div className="signup-link-container">
          <p className="sign-link-text1">
            Don't have an account?{" "}
            <Link to="/signIn" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
