import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import EmployeeCard from "./EmployeeCard";
import { date } from "../../Helpers/date";
import { Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";
import { Link } from "react-router-dom";
import MyModal from "../Global/MyModal";

const AllEmployees = ({ URL }) => {
  const PATH = "employees";
  const UPDATE_PATH = "update-employee";

  const [employees, setEmployees] = useState([]);

  // get Employees
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
  }, []);

  const [show, setShow] = useState(false);
  const [showNow, setShowNow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleEditMode = () => setEditMode(!editMode);
  const handleShowNow = () => setShowNow(!showNow);

  const [employeeInfoForModal, setEmployeeInfoForModal] = useState({});

  // Set employee info given by employee card
  const handleEmployeeSet = (values) => {
    setEmployeeInfoForModal(values);
  };

  // UPDATE Employee STATE (UI)
  const handleEmployeeStateUpdate = (id, employeeToUpdate) => {
    setEmployees(
      employees.map((employee) => {
        if (employee.employeeid === id) {
          return { ...employeeToUpdate };
        } else {
          return { ...employee };
        }
      })
    );
  };

  // const handleEmployeeStateUpdateDelete = (id) => {
  //   setEmployees(
  //     employees.filter((employee) => {
  //       return employee.employeeid === id;
  //     })
  //   );
  // };

  //   UPDATE PROJECT (DB)
  async function handleEmployeeUpdate(e, id, employeeToUpdate) {
    e.preventDefault();
    handleEmployeeStateUpdate(id, employeeToUpdate);

    // Post options
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeid: id,
        fname: `${employeeToUpdate.newFirstnameUpdated ? employeeToUpdate.newFirstname : employeeToUpdate.firstname}`,
        lname: `${employeeToUpdate.newLastnameUpdated ? employeeToUpdate.newLastname : employeeToUpdate.lastname}`,
        degree: `${employeeToUpdate.newDegreeUpdated ? employeeToUpdate.newDegree : employeeToUpdate.degree}`,
        mobile: `${employeeToUpdate.newMobileUpdated ? employeeToUpdate.newMobile : employeeToUpdate.mobile}`,
        designation: `${
          employeeToUpdate.newDesignationUpdated ? employeeToUpdate.newDesignation : employeeToUpdate.designation
        }`,
        department: `${
          employeeToUpdate.newDepartmentUpdated ? employeeToUpdate.newDepartment : employeeToUpdate.department
        }`,
        email: `${employeeToUpdate.newEmailUpdated ? employeeToUpdate.newEmail : employeeToUpdate.email}`,
        image: `${employeeToUpdate.newImageUpdated ? employeeToUpdate.newImage : employeeToUpdate.image}`,
      }),
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}${UPDATE_PATH}`, options);
      if (!fetchPromiseResponse.ok) {
        console.log(`Something went wrong with fetch from server ${fetchPromiseResponse.status}`);
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

  // DELETE EMPLOYEE From DB
  async function deleteEmployeeFromDB(id) {
    // Post options
    const options = {
      method: "DELETE",
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}delete-employee/${id}`, options);
      if (!fetchPromiseResponse.ok) {
        console.log(`Something went wrong with fetch from server ${fetchPromiseResponse.status}`);
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

  // GET FILTERED EMPLLOYEES
  const [filteredEmloyees, setfilteredEmloyees] = useState([]);
  const filterCount = filteredEmloyees.length > 0;

  // const handleFilteredEmployees = (e) => {
  //   // let found = employees.filter((employee) => {
  //   //   const { firstname, lastname, department, employeeid, designation, email, date, mobile, degree } = employee;

  //   //   if (
  //   //     e.includes(firstname)
  //   //     // e.includes(lastname) ||
  //   //     // e.includes(department) ||
  //   //     // e.includes(employeeid) ||
  //   //     // e.includes(designation) ||
  //   //     // e.includes(email) ||
  //   //     // e.includes(date) ||
  //   //     // e.includes(mobile) ||
  //   //     // e.includes(degree)
  //   //   ) {
  //   //     return employee;
  //   //   }
  //   // });
  //   // setfilteredEmloyees(found);
  //   setEmployees(
  //     employees.filter((employee) => {
  //       const { firstname, lastname, department, employeeid, designation, email, date, mobile, degree } = employee;

  //       if (
  //         e.firstname == firstname
  //         // e.includes(lastname) ||
  //         // e.includes(department) ||
  //         // e.includes(employeeid) ||
  //         // e.includes(designation) ||
  //         // e.includes(email) ||
  //         // e.includes(date) ||
  //         // e.includes(mobile) ||
  //         // e.includes(degree)
  //       )
  //         return {...employee};
  //     })
  //   );
  // };

  // Employees Content
  const employeesContent = employees.map((employee) => {
    const { department, designation, email, employeeid, firstname, lastname, mobile, degree, image } = employee;

    return (
      <EmployeeCard
        setShow={setShow}
        handleShow={handleShow}
        handleEditMode={handleEditMode}
        handleShowNow={handleShowNow}
        handleEmployeeSet={handleEmployeeSet}
        PATH={PATH}
        show={show}
        handleClose={handleClose}
        URL={URL}
        onUpdateEmployeeState={handleEmployeeDelete}
        employees={employees}
        key={employeeid}
        date={date}
        employeeid={employeeid}
        firstname={firstname}
        lastname={lastname}
        department={department}
        designation={designation}
        mobile={mobile}
        email={email}
        degree={degree}
        image={image}
        newEmployeeid={employeeInfoForModal.newEmployeeid}
        newFirstname={employeeInfoForModal.newFirstname}
        newLastname={employeeInfoForModal.newLastname}
        newDepartment={employeeInfoForModal.newDepartment}
        newDesignation={employeeInfoForModal.newDesignation}
        newMobile={employeeInfoForModal.newMobile}
        newEmail={employeeInfoForModal.newEmail}
        newDegree={employeeInfoForModal.newDegree}
        newImage={employeeInfoForModal.newImage}
        newEmployeeidUpdated={employeeInfoForModal.newEmployeeidUpdated}
        newFirstnameUpdated={employeeInfoForModal.newFirstnameUpdated}
        newLastnameUpdated={employeeInfoForModal.newLastnameUpdated}
        newDepartmentUpdated={employeeInfoForModal.newDepartmentUpdated}
        newDesignationUpdated={employeeInfoForModal.newDesignationUpdated}
        newMobileUpdated={employeeInfoForModal.newMobileUpdated}
        newEmailUpdated={employeeInfoForModal.newEmailUpdated}
        newDegreeUpdated={employeeInfoForModal.newDegreeUpdated}
        newImageUpdated={employeeInfoForModal.newImageUpdated}
        handleEmployeeUpdate={handleEmployeeUpdate}
        onDelete={deleteEmployeeFromDB}
      />
    );
  });

  const filteredEmloyeesContent = filteredEmloyees.map((employee) => {
    const { department, designation, email, employeeid, firstname, lastname, mobile, degree, image } = employee;

    return (
      <EmployeeCard
        setShow={setShow}
        handleShow={handleShow}
        handleEditMode={handleEditMode}
        handleShowNow={handleShowNow}
        employeeInfoForModal={employeeInfoForModal}
        handleEmployeeSet={handleEmployeeSet}
        key={employeeid}
        PATH={PATH}
        show={show}
        handleClose={handleClose}
        URL={URL}
        onUpdateEmployeeState={handleEmployeeDelete}
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
        newEmployeeid={employeeInfoForModal.newEmployeeid}
        newFirstname={employeeInfoForModal.newFirstname}
        newLastname={employeeInfoForModal.newLastname}
        newDepartment={employeeInfoForModal.newDepartment}
        newDesignation={employeeInfoForModal.newDesignation}
        newMobile={employeeInfoForModal.newMobile}
        newEmail={employeeInfoForModal.newEmail}
        newDegree={employeeInfoForModal.newDegree}
        newImage={employeeInfoForModal.newImage}
        newEmployeeidUpdated={employeeInfoForModal.newEmployeeidUpdated}
        newFirstnameUpdated={employeeInfoForModal.newFirstnameUpdated}
        newLastnameUpdated={employeeInfoForModal.newLastnameUpdated}
        newDepartmentUpdated={employeeInfoForModal.newDepartmentUpdated}
        newDesignationUpdated={employeeInfoForModal.newDesignationUpdated}
        newMobileUpdated={employeeInfoForModal.newMobileUpdated}
        newEmailUpdated={employeeInfoForModal.newEmailUpdated}
        newDegreeUpdated={employeeInfoForModal.newDegreeUpdated}
        newImageUpdated={employeeInfoForModal.newImageUpdated}
        handleEmployeeUpdate={handleEmployeeUpdate}
        onDelete={deleteEmployeeFromDB}
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
                      onChange={(e) => {
                        handleFilteredEmployees(e.target.value);
                        console.log(e.target.value);
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

            {/* {filterCount ? filteredEmloyeesContent : employeesContent} */}
            {employeesContent}
          </section>
        </section>
      </Container>

      {!showNow ? null : (
        <MyModal
          employees={employees}
          setEmployees={setEmployees}
          handleEditMode={handleEditMode}
          handleShowNow={handleShowNow}
          employeeInfoForModal={employeeInfoForModal}
          handleEmployeeUpdate={handleEmployeeUpdate}
          employeeid={employeeInfoForModal.employeeid}
          firstname={employeeInfoForModal.firstname}
          lastname={employeeInfoForModal.lastname}
          department={employeeInfoForModal.department}
          designation={employeeInfoForModal.designation}
          mobile={employeeInfoForModal.mobile}
          email={employeeInfoForModal.email}
          degree={employeeInfoForModal.degree}
          image={employeeInfoForModal.image}
          newEmployeeid={employeeInfoForModal.newEmployeeid}
          newFirstname={employeeInfoForModal.newFirstname}
          newLastname={employeeInfoForModal.newLastname}
          newDepartment={employeeInfoForModal.newDepartment}
          newDesignation={employeeInfoForModal.newDesignation}
          newMobile={employeeInfoForModal.newMobile}
          newEmail={employeeInfoForModal.newEmail}
          newDegree={employeeInfoForModal.newDegree}
          newImage={employeeInfoForModal.newImage}
        />
      )}
    </>
  );
};

export default AllEmployees;
