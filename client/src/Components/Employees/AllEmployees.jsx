import React, { useEffect, useState } from "react";
import Nav from "../Global/Nav";
import { Container, Form } from "react-bootstrap";

import EmployeeCard from "./EmployeeCard";

const AllEmployees = () => {
  function getDate() {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = dateObj.getMonth();
    var day = dateObj.getDate();

    const reformatMonth = () => {
      let result = "";
      (month <= 10) & (month === 0)
        ? (result = `0${month + 1}`)
        : (result = month);

      return result;
    };
    const reformatDay = () => {
      let result = "";
      day <= 10 ? (result = `0${day}`) : (result = day);
      return result;
    };
    const finalMonth = reformatMonth();
    const finalDay = reformatDay();

    let date = `${year}-${finalMonth}-${finalDay}`;

    return date;
  }

  const date = getDate()

  const URL = "http://localhost:8080";
  // get employees
  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
  }, []);
  const [employees, setEmployees] = useState([]);

  let filteredEmloyees = [];
  const [employeeNewArray, setemployeeNewArray] = useState([]);
  // SHOW UPDATE MODAL

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
                    filteredEmloyees = employees.filter((employee) => {
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
                        firstname == e.target.value ||
                        lastname == e.target.value ||
                        department == e.target.value ||
                        employeeid == e.target.value ||
                        designation == e.target.value ||
                        department == e.target.value ||
                        email == e.target.value ||
                        date == e.target.value ||
                        mobile == e.target.value
                      );
                    });
                    setemployeeNewArray(filteredEmloyees);
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
                    console.log("workinggg");
                  }}
                  className="fa-solid fa-plus icon-container-icon"
                ></i>
              </span>
              <span className="icon-container">
                <i className="fa-solid fa-arrows-rotate icon-container-icon"></i>
              </span>
            </div>
          </div>
          {employeeNewArray.length > 0
            ? employeeNewArray.map((employee) => {
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
                    // show={show}
                    // handleShow={handleShow}
                    URL={URL}
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
                )