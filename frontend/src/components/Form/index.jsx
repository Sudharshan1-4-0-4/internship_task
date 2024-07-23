import React from "react";
import { useState } from "react";
import "./form.css";

const Form = () => {
  const [assessment_id, setId] = useState("");
  
  const [assessment_name, setName] = useState("");
 
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeId = (event) => {
    setId(event.target.value);
  };
  

  const onChangeName = (event) => {
    setName(event.target.value);
  };

 
  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { assessment_id, assessment_name };
    const url = "http://localhost:4001/tasks/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    // console.log(response);
    if (response.ok) {
      console.log("navigated");
      alert("Assessment Submitted SuccessFully...")
    } else {
      setShowSubmitError(true);
      alert("Assessment Already Submitted");
      setErrorMsg("Invalid Credentials");
    }
  };

  return (
    <div className="sign-container">
      <form className="form1-container" onSubmit={submitForm}>
        <h1 className="heading">👉...Add Assessment...👈</h1>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            ID
          </label>
          <input
            type="text"
            id="username"
            value={assessment_id}
            className="username-input-field"
            onChange={onChangeId}
            placeholder="Assessment_id"
          />
        </div>
        
        <div className="input-container">
          <label className="input-label" htmlFor="party">
            NAME
          </label>
          <input
            type="text"
            id="party"
            value={assessment_name}
            className="username-input-field"
            onChange={onChangeName}
            placeholder="Assessment_name"
          />
        </div>
        
        
        <button type="submit" className="login-button">
          Add
        </button>

        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        
      </form>
      
    </div>
  );
};

export default Form;
