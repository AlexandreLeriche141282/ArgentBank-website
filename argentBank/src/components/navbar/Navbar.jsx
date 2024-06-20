import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/img/argentBankLogo.webp"
import "./navbar.css"

export default function Navbar() {

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
        <Link className="main-nav-item" to="/SignIn">
          {/* <i className="fa fa-user-circle"></i> */}
          Sign In
        </Link>
      </div>
    </nav>

    )
}