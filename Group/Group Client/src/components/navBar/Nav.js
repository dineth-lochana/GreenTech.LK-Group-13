import React , { useEffect, useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImg from './images/logo 2024.png';
import './Nav.css';
import axios from 'axios';
import swal from 'sweetalert';

function Nav(props) {
  const navigate = useNavigate();

  // Function to fetch user type and verified status from local storage
  async function fetchUserTypeAndVerifiedFromLocalStorage() {
      try {
          const userEmail = localStorage.getItem('useremail');
          if (!userEmail) {
              // Return default values if user email is not found
              return { userType: null, verified: null };
          }
          const response = await axios.get(`http://localhost:8800/profile/${encodeURIComponent(userEmail)}`);
          console.log("User type is " + response.data.type);
          console.log("User verified status is " + response.data.verified);
          return {
              userType: response.data.type,
              verified: response.data.verified
          };
      } catch (error) {
          console.error('Error fetching user type and verified status:', error);
          throw error;
      }
  }

  const [userType, setUserType] = useState(null);
  const [verified, setVerified] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        try {
            const { userType, verified } = await fetchUserTypeAndVerifiedFromLocalStorage();
            setUserType(userType);
            setVerified(verified);
        

          
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("An error occurred while fetching data.");
        }
    };

    fetchData();
}, []);

  

  const handleLogout = async () => {
    swal({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willLogout) => {
      if (willLogout) {
        try {
          await axios.post('http://localhost:8800/logout');
          props.setUseremail('');
          localStorage.removeItem('useremail'); // Clear local storage
          navigate('/login');
       
          setUserType(null);
          setVerified(null);

          swal("Success!", "You're logged out !", "success");
       

        } catch (error) {
          console.error('Logout failed:', error);
          swal("Error!", "Logout failed. Please try again.", "error");
        }
      }
    });
  };

  return (
    <div className="nisansa_nav">
       
    <nav className="navbar navbar-expand-lg navbar-light p-3 navdesign">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
         {/*<img src={logoImg} alt="Logo" style={{ maxWidth: '100px', maxHeight: '50px' }} />*/}
          <img src="./images/logo 2024 .png" alt="Logo" height="90" style={{ paddingLeft: "20px" }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end contentnav" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
      <Link className="nav-link" >
        Products
      </Link>
      <div className="dropdown-content">
        <Link to="/SolarProducts">Solar</Link>
        <Link to="/FireProducts">Fire Detection and Protection</Link>
        <Link to="/ControlsProducts">Controls</Link>
      </div>
    </li>
            <li className="nav-item">
              <Link className="nav-link" to="/quotation">Quotations</Link>
            </li>            
            <li className="nav-item">
              <Link className="nav-link" to="/projects">Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Educated">Learn</Link>
            </li>            
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
           
            <li className="nav-item">
            {(userType === 1 && verified === "True") && (
                            <>
              <Link className="nav-link" to="/AdminDashbord">Dashboard</Link>
              </>
                        )}  

            </li>
  

            <li className="nav-item">

                <Link className="nav-link" to="http://localhost:3001/">Forum</Link>
           
            </li>


            <li className="nav-item">
              {props.useremail ? (
                <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
              ) : (
                <Link className="nav-link" to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    </div>
    
  );
}

export default Nav;
