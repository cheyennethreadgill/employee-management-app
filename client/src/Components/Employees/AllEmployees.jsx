import React, { useState, useEffect } from "react";
import Nav from "../Global/Nav";
import { Container, Form } from "react-bootstrap";
import EmployeeCard from "./EmployeeCard";
import { date } from "../../Helpers/date";
import { Navigate, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";

const AllEmployees = () => {
  const URL = "https://employee-management-app-eight.vercel.app/";
  const PATH = "employees";

  const [employees, setEmployees] = useState([]);
  const [filteredEmloyees, setfilteredEmloyees] = useState([]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  let navigate = useNavigate();

  // get Employees
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
  }, []);
  const filterCount = filteredEmloyees.length > 0;

  // GET FILTERED EMPLLOYEES
  const handleFilteredEmployees = (e) => {
    setfilteredEmloyees(
      employees.filter((employee) => {
        const {
          firstname,
          lastname,
          department,
          employeeid,
          designation,
          email,
          date,
          mobile,
        } = employee;
        return (
          firstname.includes(e.target.value) ||
          lastname.includes(e.target.value) ||
          department == e.target.value ||
          employeeid == e.target.value ||
          designation == e.target.value ||
          department == e.target.value ||
          email == e.target.value ||
          date == e.target.value ||
          mobile == e.target.value
        );
      })
    );
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
    } = employee;

    return (
      <EmployeeCard
        PATH={PATH}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        URL={URL}
        onUpdateEmployeeState={handleEmployeeDelete}
        onDelete={deleteEmployeeFromDB}
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
      />
    );
  });

  return (
    <>
      <Container>
        <PageHeaders name={PATH} />
        <section className="employees">
          <Row className="employees-header">
            <Col lg="7">
              <Row>
                <Col
                  md="1"
                  lg="2"
                >
                  <h2>Employees</h2>
                </Col>
                <Col
                  md="1"
                  lg="10"
                >
                  {" "}
                  <div className="header-search form-control-container">
                    <span className="search-icon form-control-container-icon">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <Form.Control
                      className="header-search-input form-control-container-input m-0"
                      type="text"
                      placeholder="Search"
                      onChange={(e) => {
                        handleFilteredEmployees(e);
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Col>

            <Col
              lg="2"
              className="employees-header-controls"
            >
              <span className="icon-container">
                <i
                  type="button"
                  onClick={() => {
                    navigate(PATH);
                  }}
                  className="fa-solid fa-plus icon-container-icon add-employee-btn"
                ></i>
              </span>
              <span className="icon-container">
                <i className="fa-solid fa-arrows-rotate icon-container-icon"></i>
              </span>
            </Col>
          </Row>
          {filterCount ? filteredEmloyeesContent : employeesContent}
        </section>
      </Container>
    </>
  );
};

export default AllEmployees;
