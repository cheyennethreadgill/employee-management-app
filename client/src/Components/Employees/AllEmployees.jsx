import React, { useState, useEffect } from "react";
import Nav from "../Global/Nav";
import { Container, Form } from "react-bootstrap";
import EmployeeCard from "./EmployeeCard";
import { date } from "../../Helpers/date";
import GetEmployeesNow from "../../Hooks/GetEmployeesNow";

const AllEmployees = () => {
  const URL = "http://localhost:8080";
  const [employees, setEmployees] = useState([]);
  const [filteredEmloyees, setfilteredEmloyees] = useState([]);

  // get Employees
  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
  }, []);
  console.log(employees);

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
        `${URL}/delete-employee/${id}`,
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

  return (
    <>
      <Nav />

      <Container>
        <section className="employees">
          <div className="employees-header">
            <div>
              <h2>Employees</h2>
              <div className="header-search form-control-container">
                <span className="search-icon form-control-container-icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <Form.Control
                  className="header-search-input"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => {
                    handleFilteredEmployees(e);
                  }}
                />
              </div>
            </div>

            <div className="employees-header-controls">
              <span className="icon-container">
                <i
                  type="button"
                  onClick={() => {
                    handleShow;
                  }}
                  className="fa-solid fa-plus icon-container-icon"
                ></i>
              </span>
              <span className="icon-container">
                <i className="fa-solid fa-arrows-rotate icon-container-icon"></i>
              </span>
            </div>
          </div>
          {filteredEmloyees.length > 0
            ? filteredEmloyees.map((employee) => {
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
              })
            : employees.map((employee) => {
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
              })}
        </section>
      </Container>
    </>
  );
};

export default AllEmployees;
