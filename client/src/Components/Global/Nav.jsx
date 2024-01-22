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
      <div className="main-nav">
        <div className="main-nav-controls">
          {toggled ? (
            <img
              src={require("../../images/logo.png")}
              alt=""
            />
          ) : (
            <div className="main-nav-brand">
              <img
                src={require("../../images/logo.png")}
                alt=""
              />
              <h1>Kuber</h1>
            </div>
          )}
          <button
            type="button"
            className="main-nav-toggle"
            onClick={handleNavToggle}
          >
            =
          </button>
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

// function Navigation() {
//   return (
//     <Navbar
//       expand="lg"
//       className="bg-body-tertiary"
//     >
//       <Container>
//         <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />

//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {/* MAIN LINKS */}
//             <Nav.Link href="/">Dashboard</Nav.Link>
//             <Nav.Link href="/add-employee"></Nav.Link>
//             {/* EMPLOYEES */}
//             <NavDropdown
//               title="Employees"
//               id="basic-nav-dropdown"
//             >
//               <NavDropdown.Item href="/add-employee">
//                 Add Employee
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/all-employees">
//                 all employees
//               </NavDropdown.Item>
//             </NavDropdown>
//             {/* EMPLOYEES END */}
//             {/* PROJECTS */}
//             <NavDropdown
//               title="Projects"
//               id="basic-nav-dropdown"
//             >
//               <NavDropdown.Item href="/add-project">
//                 Add Project
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/all-projects">
//                 All Projects
//               </NavDropdown.Item>
//             </NavDropdown>
//             {/* PROJECTS END */}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

export default Navigation;
