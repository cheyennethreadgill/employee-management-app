import React, { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate } from "react-router-dom";
import Logo from "../../images/logo.png";

const Navigation = ({ handleNavToggle, handleMouseLeave, toggled }) => {
  return (
    <>
      <nav
        className={
          toggled
            ? "main-nav-list_toggled main-nav-list_toggled_mobile"
            : "main-nav-list"
        }
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleNavToggle}
      >
        {toggled ? (
          <i className=" main-nav-list-icon fa-solid fa-table-columns"></i>
        ) : (
          <span className="main-nav-list-linkContainer">
            <i className="fa-solid fa-table-columns"></i>
            <Link to="/">Dashboard</Link>
          </span>
        )}
        {toggled ? (
          <i className=" main-nav-list-icon fa-solid fa-book"></i>
        ) : (
          <p className="main-nav-list-linkHeader d-flex flex-column">
            Projects
            <Link to="/add-projects">Add Projects</Link>
            <Link to="/all-projects">All Projects</Link>
          </p>
        )}
        {toggled ? (
          <i className="fa main-nav-list-icon -solid fa-user"></i>
        ) : (
          <p className="main-nav-list-linkHeader d-flex flex-column">
            Employees
            <Link to="/add-employee">Add Employee</Link>
            <Link to="/all-employees">All Employees</Link>
          </p>
        )}
      </nav>
    </>
  );
};

export default Navigation;
