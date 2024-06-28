import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/img/argentBankLogo.webp";
import { AuthContext } from '../../services/AuthContext';
import "./navbar.css";

export default function Navbar() {
  const { isAuthenticated, username, logout } = useContext(AuthContext);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
            <span className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {username}
            </span>
            <Link className="main-nav-item" to="/" onClick={logout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/SignIn">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
