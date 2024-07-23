import { Link } from 'react-router-dom';

import './index.css';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-heading">...Internship...</h1>
          <p className="home-description">
            Millions of people are submitting their assessments, You can submit the Your Assessments Tasks here...
          </p>
          
           
             <Link to='/addAssessment'><button className="button">Submit</button></Link> 
           
          
        </div>
      </div>
    </>
  );
};

export default Home;
