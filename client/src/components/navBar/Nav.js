import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImg from './images/logo 2024.png';
import './Nav.css';
import axios from 'axios';
import swal from 'sweetalert';

function Nav(props) {
  const navigate = useNavigate();

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
          swal("Logged Out!", "You have been successfully logged out.", "success");
        } catch (error) {
          console.error('Logout failed:', error);
          swal("Error!", "Logout failed. Please try again.", "error");
        }
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3 navdesign">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">
          <img src={logoImg} alt="Logo" style={{ maxWidth: '100px', maxHeight: '50px' }} />
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
      <Link className="nav-link" to="/products">
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
              <Link className="nav-link" to="/products">Forum</Link>
            </li>            
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
           
            <li className="nav-item">
              <Link className="nav-link" to="/AdminDashbord">Dashboard</Link>
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
  );
}

export default Nav;
