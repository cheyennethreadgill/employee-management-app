import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import EmployeeCard from "./EmployeeCard";
import { date } from "../../Helpers/date";
import { Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";
import { Link } from "react-router-dom";
import MyModal from "../Global/MyModal";
import { useToken } from "../../Hooks/useToken";
import { json, response } from "express";
import { useUser } from "../../Hooks/useUser";
import { DeleteNotification } from "../Global/Notifications";

const AllEmployees = ({
  URL,
  EMPLOYEE_PATH,
  UPDATE_PATH,
  handleLoadingState,
  loading,
  setDeleteNotif,
  deleteNotif,
  employees,
  handleSetEmployees,
  handleFetchError,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
}) => {
  interface EmployeeObjectInterface {
    employeeid: string;
    id: string;
    _id: string;
    fname?: string;
    firstname?: string;
    lname?: string;
    lastname?: string;
    department: string;
    designation: string;
    mobile: string;
    email: string;
    degree: string;
    image: File;
    newEmployeeid: number;
    newFirstname: string;
    newLastname: string;
    newDepartment: string;
    newDesignation: string;
    newMobile: string;
    newEmail: string;
    newDegree: string;
    newImage: File;
    newEmployeeidUpdated: boolean;
    newFirstnameUpdated: boolean;
    newLastnameUpdated: boolean;
    newDepartmentUpdated: boolean;
    newDesignationUpdated: boolean;
    newMobileUpdated: boolean;
    newEmailUpdated: boolean;
    newDegreeUpdated: boolean;
    newImageUpdated: boolean;
  }

  const titles = [
    "",
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

  const [show, setShow] = useState(false);
  const [showNow, setShowNow] = useState(false);
  const [deletePrompt, setDeletePrompt] = useState(false);
  const [deletePromptNow, setDeletePromptNow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [token, setToken] = useToken();

  const [employeeInfoForModal, setEmployeeInfoForModal] = useState<EmployeeObjectInterface>({
    employeeid: "",
    id: null,
    _id: null,
    firstname: "",
    lastname: "",
    department: "",
    designation: "",
    mobile: "",
    email: "",
    degree: "",
    image: null,
    newEmployeeid: null,
    newFirstname: "",
    newLastname: "",
    newDepartment: "",
    newDesignation: "",
    newMobile: "",
    newEmail: "",
    newDegree: "",
    newImage: null,
    newEmployeeidUpdated: false,
    newFirstnameUpdated: false,
    newLastnameUpdated: false,
    newDepartmentUpdated: false,
    newDesignationUpdated: false,
    newMobileUpdated: false,
    newEmailUpdated: false,
    newDegreeUpdated: false,
    newImageUpdated: false,
  });

  const handleShow = () => setShow(true);
  const handleShowDeletePrompt = () => setDeletePrompt(true);
  const handleClose = () => setShow(false);
  const handleEditMode = () => setEditMode(!editMode);
  const handleShowNow = () => setShowNow(!showNow);
  const handleShowDeletePromptNow = () => setDeletePromptNow(!deletePromptNow);

  const [employeeAuth, setEmployeeAuth] = useState({
    employeeError: false,
    response: "",
  });

  // Set employee info for modal given by employee card
  const handleEmployeeSetForModal = (employeeObject: EmployeeObjectInterface) => {
    setEmployeeInfoForModal(employeeObject);
  };

  // *******UI STATE
  // UPDATE Employee (UI)
  const handleEmployeeStateUpdate = (id: string, employeeToUpdate: EmployeeObjectInterface) => {
    console.log("handleEmployeeStateUpdate function ran");
    console.log(`ID in handleEmployeeStateUpdate ${id}`);
    handleSetEmployees(
      employees.map((employee: { _id: string }) => {
        const { _id } = employee;
        if (_id === id) {
          return { ...employeeToUpdate };
        } else {
          return { ...employee };
        }
      })
    );
  };

  // Delete Employee (UI)
  const handleEmployeeDelete = (id: string) => {
    handleSetEmployees(
      employees.filter((employee: EmployeeObjectInterface) => {
        const { _id } = employee;
        return _id !== id;
      })
    );
  };

  //   UPDATE EMPLOYEE (DB)
  async function handleEmployeeUpdate(id: string, employeeToUpdate: EmployeeObjectInterface) {
    console.log(employeeToUpdate);

    const dataToUpload = {
      _id: employeeToUpdate.employeeid,
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
      image: (employeeToUpdate.newImageUpdated && employeeToUpdate.newImage) || employeeToUpdate.image || " ",
    };

    // Post options

    // // set up form data API to use for multiform post
    // const formData = new FormData();

    // // append keys in body to new form object
    // formData.append("employeeid", id);
    // formData.append(
    //   "fname",
    //   `${employeeToUpdate.newFirstnameUpdated ? employeeToUpdate.newFirstname : employeeToUpdate.firstname}`
    // );
    // formData.append(
    //   "lname",
    //   `${employeeToUpdate.newLastnameUpdated ? employeeToUpdate.newLastname : employeeToUpdate.lastname}`
    // );
    // formData.append(
    //   "degree",
    //   `${employeeToUpdate.newDegreeUpdated ? employeeToUpdate.newDegree : employeeToUpdate.degree}`
    // );
    // formData.append(
    //   "mobile",
    //   `${employeeToUpdate.newMobileUpdated ? employeeToUpdate.newMobile : employeeToUpdate.mobile}`
    // );
    // formData.append(
    //   "designation",
    //   `${employeeToUpdate.newDesignationUpdated ? employeeToUpdate.newDesignation : employeeToUpdate.designation}`
    // );
    // formData.append(
    //   "department",
    //   `${employeeToUpdate.newDepartmentUpdated ? employeeToUpdate.newDepartment : employeeToUpdate.department}`
    // );
    // formData.append(
    //   "email",
    //   `${employeeToUpdate.newEmailUpdated ? employeeToUpdate.newEmail : employeeToUpdate.email}`
    // );
    // formData.append(
    //   "image",
    //   (employeeToUpdate.newImageUpdated && employeeToUpdate.newImage) || employeeToUpdate.image || " "
    // );

    const options = {
      method: "PUT",
      body: JSON.stringify(dataToUpload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}admin/${UPDATE_PATH}/${id}`, options);
      handleFetchPromiseError(fetchPromiseResponse);
      const jsonPromiseResponse = await fetchPromiseResponse.json();
      handleJsonPromiseResponseLog(jsonPromiseResponse);
      console.log(jsonPromiseResponse.message);

      if (!fetchPromiseResponse.ok) {
        setEmployeeAuth({ response: jsonPromiseResponse.message, employeeError: true });
        console.log(fetchPromiseResponse);
        setDeleteNotif(true);
        setTimeout(() => {
          setDeleteNotif(false);
        }, 5000);
      } else {
        handleEmployeeStateUpdate(id, employeeToUpdate);
        setEmployeeAuth({ response: jsonPromiseResponse.message, employeeError: false });
        setDeleteNotif(true);
        setTimeout(() => {
          setDeleteNotif(false);
        }, 5000);
      }
    } catch (err) {
      handleFetchError(err);
    }
  }

  // DELETE EMPLOYEE From DB
  async function deleteEmployeeFromDB(email: string) {
    // Post options
    const options = {
      method: "DELETE",
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}admin/delete-employee/${email}`, options);
      handleFetchPromiseError(fetchPromiseResponse);
      const jsonPromiseResponse = fetchPromiseResponse.json() || fetchPromiseResponse.text();
      handleJsonPromiseResponseLog(jsonPromiseResponse);
    } catch (err) {
      handleFetchError(err);
    }
  }

  // SEARCH EMPLLOYEES
  // sets filtered employees initial state with employees
  const [filteredEmloyees, setfilteredEmloyees] = useState(employees);
  const filterCount = filteredEmloyees.length > 0;
  const employeeCount = employees.length > 0;

  const handleFilteredEmployees = (e: string) => {
    let searchValue = e.toString().toLowerCase(); // Ensure value is a string

    console.log(searchValue);
    // // sets filtered employee with found employee from filter fn
    let found = employees.filter((employee: EmployeeObjectInterface) => {
      const { department, designation, email, _id, fname, lname, mobile, degree } = employee;

      if (department || designation || email || _id || fname || lname || mobile || degree) {
        if (
          (_id && _id.includes(searchValue)) ||
          (department && department.includes(searchValue)) ||
          (designation && designation.includes(searchValue)) ||
          (email && email.includes(searchValue)) ||
          (fname && fname.includes(searchValue)) ||
          (lname && lname.includes(searchValue)) ||
          (mobile && mobile.includes(searchValue)) ||
          (degree && degree.includes(searchValue))
        ) {
          return employee;
        }
      }
    });
    setfilteredEmloyees(found);
  };

  // Employees Content
  const employeesContent = employees.map((employee: EmployeeObjectInterface) => {
    const { department, designation, email, _id, fname, lname, mobile, degree, image } = employee;

    return (
      <EmployeeCard
        key={_id}
        handleShowDeletePrompt={handleShowDeletePrompt}
        handleEditMode={handleEditMode}
        handleShowNow={handleShowNow}
        handleEmployeeSetForModal={handleEmployeeSetForModal}
        onUpdateEmployeeState={handleEmployeeDelete}
        employees={employees}
        date={date}
        employeeid={_id}
        firstname={fname}
        lastname={lname}
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
  const filteredEmloyeesContent = filteredEmloyees.map((employee: EmployeeObjectInterface) => {
    const { department, designation, email, _id, fname, lname, mobile, degree, image } = employee;

    return (
      <EmployeeCard
        key={_id}
        handleShowDeletePrompt={handleShowDeletePrompt}
        handleEditMode={handleEditMode}
        handleShowNow={handleShowNow}
        handleEmployeeSetForModal={handleEmployeeSetForModal}
        onUpdateEmployeeState={handleEmployeeDelete}
        employees={employees}
        employeeid={_id}
        firstname={fname}
        lastname={lname}
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
        <PageHeaders title="employees" />
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
                  <div className="employees-header-search form-control-container">
                    <span className="gg-search"></span>
                    <Form.Control
                      className="employees-header-search-input form-control-container-input m-0"
                      type="text"
                      placeholder="Search"
                      onChange={(e) => {
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
                <Link
                  to="/add-employee"
                  aria-label="Add Employee"
                >
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
            {!employeeCount && handleLoadingState(false) && <button className="btn btn-lg">Add Employees</button>}
            {/* if there isnt any employees, set loading to false
            if there is employees, set loading to true && filtercount */}
          </section>
        </section>

        {deleteNotif && (
          <DeleteNotification
            deleteNotif={deleteNotif}
            response={employeeAuth.response}
          />
        )}
      </Container>

      {!showNow ? null : (
        <MyModal
          URL={URL}
          UPDATE_PATH={UPDATE_PATH}
          token={token}
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
        />
      )}
    </>
  );
};

export default AllEmployees;
