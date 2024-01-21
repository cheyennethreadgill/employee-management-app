import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate } from "react-router-dom";

// const Navigation = () => {
//   let navigate = useNavigate();
//   return (
//     <nav className="main-nav">
//       <div className="main-nav-controls">
//         <h1 className="main-nav-brand">LOGO</h1>
//         <h1 className="main-nav-toggle">=</h1>
//       </div>

//       <li className="main-nav-list">
//         <a href="/">Dashboard</a>
//         <a href="/all-projects">Add Projects</a>
//         <a href="/all-projects">All Projects</a>
//         <a href="/all-employees">All Employees</a>
//         <a href="/add-employee">Add Employee</a>
//       </li>
//     </nav>
//   );
// };

function Navigation() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* MAIN LINKS */}
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/add-employee"></Nav.Link>
            {/* EMPLOYEES */}
            <NavDropdown
              title="Employees"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/add-employee">
                Add Employee
              </NavDropdown.Item>
              <NavDropdown.Item href="/all-employees">
                all employees
              </NavDropdown.Item>
            </NavDropdown>
            {/* EMPLOYEES END */}
            {/* PROJECTS */}
            <NavDropdown
              title="Projects"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/add-project">
                Add Project
              </NavDropdown.Item>
              <NavDropdown.Item href="/all-projects">
                All Projects
              </NavDropdown.Item>
            </NavDropdown>
            {/* PROJECTS END */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
