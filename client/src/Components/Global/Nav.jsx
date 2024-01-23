import React, { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate } from "react-router-dom";
import Logo from "../../images/logo.png";

const Navigation = () => {
  let navigate = useNavigate();

  const [toggled, setToggled] = useState(true);
  const handleNavToggle = () => setToggled(!toggled);
  const handleMouseLeave = () => setToggled(true);

  return (
    <>
      <div className="brand-bar-mobile  d-md-block d-lg-none">
        <div className="brand-bar-mobile-controls-container">
          <div className="brand-bar-mobile-controls">
            <>
              <button
                type="button"
                className="brand-bar-mobile-toggle "
                onClick={handleNavToggle}
              >
                =
              </button>
              <div className="brand-bar-mobile-brand">
                <img
                  src={require("../../images/logo.png")}
                  alt=""
                  className="brand-bar-mobile-brand-icon"
                />
                <h1 className="brand-bar-mobile-brand-logo">Kuber</h1>
              </div>
            </>

            <div className="brand-bar-mobile-brand-right">
              <p>Ella Jones</p>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-bar-desktop d-none d-lg-block">
        <div className="brand-bar-desktop-controls-container">
          <div className="brand-bar-desktop-controls">
            {toggled ? (
              <img
                src={require("../../images/logo.png")}
                alt=""
              />
            ) : (
              <div className="brand-bar-desktop-brand-left">
                <div className="">
                  <img
                    src={require("../../images/logo.png")}
                    alt=""
                  />
                  <h1>Kuber</h1>
                </div>
              </div>
            )}
            <button
              type="button"
              className="brand-bar-desktop-toggle "
              onClick={handleNavToggle}
            >
              =
            </button>
            <div className="brand-bar-desktop-brand-right">
              <p>Ella Jones</p>
            </div>
          </div>
        </div>
      </div>

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
