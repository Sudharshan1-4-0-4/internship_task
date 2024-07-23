import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import './index.css';


const Header = () => {
  const navigate = useNavigate();
  
  const onClickLogout = () => {
    navigate('/');
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/home">
             <h1 className='logo1'>Intern <span className='logo2'>Task</span></h1>
          </Link>

          <ul className="nav-bar-mobile-icons-container">
            <li>
              <Link to="/home">
                <AiFillHome className="nav-item-mobile-link" />
              </Link>
            </li>
            <li>
              <Link to="/assessments">
                <BsFillBriefcaseFill className="nav-item-mobile-link" />
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="nav-mobile-btn"
                onClick={onClickLogout}
              >
                <FiLogOut />
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/home">
            <h1 className='logo1'>Intern <span className='logo2'>Task</span></h1>
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/assessments" className="nav-link">
                Assessments
              </Link>
            </li>
                       
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
