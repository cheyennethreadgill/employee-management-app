import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import EmployeeCard from "./EmployeeCard";
import { date } from "../../Helpers/date";
import { Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";
import { Link } from "react-router-dom";
import MyModal from "../Global/MyModal";

const AllEmployees = ({ URL, handleFetchPromiseError, handleJsonPromiseResponseLog, handleFetchError }) => {
  // const handleEmployeeStateUpdateDelete = (id) => {
  //   setEmployees(
  //     employees.filter((employee) => {
  //       return employee.employeeid === id;
  //     })
  //   );
  // };

  const PATH = "employees";
  const UPDATE_PATH = "update-employee";
  const titles = [
    "Image",
    "Employee ID",
    "Name",
    "Degree",
    "Department",
    "Designation",
    "Mobile",
    "Email",
    "Join Date",
    "Actions",
  ];

  // get Employees
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
    handleLoadingState(false);
  }, []);

  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [showNow, setShowNow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleLoadingState = (value) => setLoading(value);

  const [employeeInfoForModal, setEmployeeInfoForModal] = useState({});

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleEditMode = () => setEditMode(!editMode);
  const handleShowNow = () => setShowNow(!showNow);

  // Set employee info given by employee card
  const handleEmployeeSet = (values) => {
    setEmployeeInfoForModal(values);
  };

  // *******UI STATE
  // UPDATE Employee (UI)
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

  // Delete Employee (UI)
  const handleEmployeeDelete = (id) => {
    setEmployees(
      employees.filter((employee) => {
        const { employeeid } = employee;
        return employeeid !== id;
      })
    );
  };

  //   UPDATE EMPLOYEE (DB)
  async function handleEmployeeUpdate(e, id, employeeToUpdate) {
    handleEmployeeStateUpdate(id, employeeToUpdate);

    // set up form data API to use for multiform post
    const formData = new FormData();

    // append keys in body to new form object
    formData.append("employeeid", id);
    formData.append(
      "fname",
      `${employeeToUpdate.newFirstnameUpdated ? employeeToUpdate.newFirstname : employeeToUpdate.firstname}`
    );
    formData.append(
      "lname",
      `${employeeToUpdate.newLastnameUpdated ? employeeToUpdate.newLastname : employeeToUpdate.lastname}`
    );
    formData.append(
      "degree",
      `${employeeToUpdate.newDegreeUpdated ? employeeToUpdate.newDegree : employeeToUpdate.degree}`
    );
    formData.append(
      "mobile",
      `${employeeToUpdate.newMobileUpdated ? employeeToUpdate.newMobile : employeeToUpdate.mobile}`
    );
    formData.append(
      "designation",
      `${employeeToUpdate.newDesignationUpdated ? employeeToUpdate.newDesignation : employeeToUpdate.designation}`
    );
    formData.append(
      "department",
      `${employeeToUpdate.newDepartmentUpdated ? employeeToUpdate.newDepartment : employeeToUpdate.department}`
    );
    formData.append(
      "email",
      `${employeeToUpdate.newEmailUpdated ? employeeToUpdate.newEmail : employeeToUpdate.email}`
    );
    formData.append(
      "image",
      (employeeToUpdate.newImageUpdated && employeeToUpdate.newImage) || employeeToUpdate.image || " "
    );

    // Post options
    const options = {
      method: "PUT",
      body: formData,
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}${UPDATE_PATH}`, options);
      handleFetchPromiseError(fetchPromiseResponse);
      const jsonPromiseResponse = fetchPromiseResponse.json();
      handleJsonPromiseResponseLog(jsonPromiseResponse);
    } catch {
      (err) => handleFetchError(err);
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
      handleFetchPromiseError(fetchPromiseResponse);
      const jsonPromiseResponse = fetchPromiseResponse.json();
      handleJsonPromiseResponseLog(jsonPromiseResponse);
    } catch {
      (err) => {
        (err) => handleFetchError(err);
      };
    }
  }

  // GET FILTERED EMPLLOYEES
  // sets filtered employees initial state with employees
  const [filteredEmloyees, setfilteredEmloyees] = useState(employees);
  const filterCount = filteredEmloyees.length > 0;
  console.log(filteredEmloyees.length);

  const handleFilteredEmployees = (e) => {
    // sets filtered employee with found employee from filter fn
    let found = employees.filter((employee) => {
      const { department, designation, email, employeeid, firstname, lastname, mobile, degree, image } = employee;
      if (
        department == e ||
        designation == e ||
        email == e ||
        employeeid == e ||
        firstname == e ||
        lastname == e ||
        mobile == e ||
        degree == e ||
        image == e
      )
        return employee;
    });
    setfilteredEmloyees(found);
  };

  // Employees Content
  const employeesContent = employees.map((employee) => {
    const { department, designation, email, employeeid, firstname, lastname, mobile, degree, image } = employee;

    return (
      <EmployeeCard
        key={employeeid}
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
        key={employeeid}
        setShow={setShow}
        handleShow={handleShow}
        handleEditMode={handleEditMode}
        handleShowNow={handleShowNow}
        employeeInfoForModal={employeeInfoForModal}
        handleEmployeeSet={handleEmployeeSet}
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
                        console.log(filteredEmloyees);
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
              {titles.map((title) => {
                return <h3 key={title}>{title}</h3>;
              })}
              <hr />
            </div>

            {!loading && filterCount && filteredEmloyeesContent}
            {!loading && !filterCount && employeesContent}
            {loading && <div className="loading"></div>}
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
