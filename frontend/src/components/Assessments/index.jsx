import React, { useState, useEffect } from 'react';


import './index.css';

function Assessments() {
  const [app, setApplications] = useState([]);
   useEffect(() => {

    const calling = async () => {
    
      const url = "http://localhost:4001/assessments/";
      const options = {
        method: 'GET',
      };

      const response = await fetch(url, options);
      
      if (response.ok) {
       
        const data = await response.json(); 
        console.log(data);
        setApplications(data);
        
      } else {
        console.log("Error adding assessments");
      }
    };

    calling();

  }, []);
  console.log(app);

  return (
    <div>
      <div>
      <h1 >Your Assessments...</h1>
      <marquee className="marq">🏃‍♂️🏃‍♂️...Internship Platform..,🏃‍♂️🏃‍♂️</marquee>
      <div>
        {app.length > 0 ? (
          app.map(a => (
            <div className='card'>
                <p>Assessment Id : {a. assessment_id}</p>
                <p>Assessment Name : {a.assessment_name}</p>
            </div>
          ))
        ) : (
          <p>No Assessments found.</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default Assessments;
