import React, { useState, useEffect } from "react";
import Navigation from "../Global/Nav";
import { Container, Form } from "react-bootstrap";
import EmployeeCard from "./EmployeeCard";
import { date } from "../../Helpers/date";
import { Navigate, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";
import { Link } from "react-router-dom";

const AllEmployees = () => {
  // const URL = "http://localhost:8080/";
  const URL = "https://employee-management-app-rho.vercel.app/";
  const PATH = "employees";

  const [employees, setEmployees] = useState([]);
  const [filteredEmloyees, setfilteredEmloyees] = useState([]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // get Employees
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
  }, []);
  const filterCount = filteredEmloyees.length > 0;

  // GET FILTERED EMPLLOYEES
  const handleFilteredEmployees = (e) => {
    let found = employees.filter((employee) => {
      const {
        firstname,
        lastname,
        department,
        employeeid,
        designation,
        email,
        date,
        mobile,
        degree,
      } = employee;

      if (
        e.includes(firstname) ||
        e.includes(lastname) ||
        e.includes(department) ||
        e.includes(employeeid) ||
        e.includes(designation) ||
        e.includes(email) ||
        e.includes(date) ||
        e.includes(mobile) ||
        e.includes(degree)
      ) {
        return employee;
      }
    });
    setfilteredEmloyees(found);
  };

  // DELETE EMPLOYEE From DB
  async function deleteEmployeeFromDB(id) {
    // Post options
    const options = {
      method: "DELETE",
    };

    try {
      const fetchPromiseResponse = await fetch(
        `${URL}delete-employee/${id}`,
        options
      );
      if (!fetchPromiseResponse.ok) {
        console.log(
          `Something went wrong with fetch from server ${fetchPromiseResponse.status}`
        );
      }
      const jsonPromiseResponse = fetchPromiseResponse.json();

      jsonPromiseResponse.then((res) => {
        console.log(res);
      });
    } catch {
      (err) => {
        console.log(`FETCH FAILED: ${err}`);
      };
    }
  }

  // Delete Employee State
  const handleEmployeeDelete = (id) => {
    setEmployees(
      employees.filter((employee) => {
        const { employeeid } = employee;
        return employeeid !== id;
      })
    );
  };

  // Employees Content
  const employeesContent = employees.map((employee) => {
    const {
      department,
      designation,
      email,
      employeeid,
      firstname,
      lastname,
      mobile,
      degree,
      image,
    } = employee;

    return (
      <EmployeeCard
        PATH={PATH}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        URL={URL}
        onDelete={deleteEmployeeFromDB}
        onUpdateEmployeeState={handleEmployeeDelete}
        employees={employees}
        key={employeeid}
        employeeid={employeeid}
        firstname={firstname}
        lastname={lastname}
        department={department}
        designation={designation}
        mobile={mobile}
        email={email}
        date={date}
        degree={degree}
        image={image}
      />
    );
  });

  const filteredEmloyeesContent = filteredEmloyees.map((employee) => {
    const {
      department,
      designation,
      email,
      employeeid,
      firstname,
      lastname,
      mobile,
      degree,
      image,
    } = employee;

    return (
      <EmployeeCard
        key={employeeid}
        PATH={PATH}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        URL={URL}
        onUpdateEmployeeState={handleEmployeeDelete}
        onDelete={deleteEmployeeFromDB}
        employees={employees}
        employeeid={employeeid}
        firstname={firstname}
        lastname={lastname}
        department={department}
        designation={designation}
        mobile={mobile}
        email={email}
        date={date}
        degree={degree}
        image={image}
      />
    );
  });

  return (
    <>
      <Container>
        <PageHeaders name={PATH} />
        <section className="employees">
          <Row className="employees-header">
            <Col
              lg="7"
              sm="1"
            >
              <div className="employees-header-left">
                <Col
                  sm="1"
                  lg="2"
                >
                  <h2>Employees</h2>
                </Col>
                <Col
                  sm="1"
                  lg="4"
                >
                  {" "}
                  <div className="employees-header-search form-control-container">
                    <span className="gg-search"></span>
                    <Form.Control
                      className="employees-header-search-input form-control-container-input m-0"
                      type="text"
                      placeholder="Search"
                      onKeyDown={(e) => {
                        handleFilteredEmployees(e.target.value);
                      }}
                    />
                  </div>
                </Col>
              </div>
            </Col>

            <Col
              lg="2"
              sm="1"
              md="3"
              className="employees-header-controls"
            >
              <span className="icon-container">
                <Link to="/add-employee">
                  <i className="fa-solid fa-plus icon-container-icon add-employee-btn"></i>
                </Link>
              </span>
              <span className="icon-container">
                <i className="fa-solid fa-arrows-rotate icon-container-icon"></i>
              </span>
            </Col>
          </Row>

          <section className="employees-card-container">
            <div className="employees-card-titles-desktop d-none d-md-flex">
              {" "}
              <h3></h3>
              <h3>Image</h3>
              <h3>Employee ID</h3>
              <h3>Name</h3>
              <h3>Degree</h3>
              <h3>Department</h3>
              <h3>Designation</h3>
              <h3>Mobile</h3>
              <h3>Email</h3>
              <h3>Join Date</h3>
              <h3>Actions</h3>
              <hr />
            </div>

            {filterCount ? filteredEmloyeesContent : employeesContent}
          </section>
        </section>
      </Container>
    </>
  );
};

export default AllEmployees;
