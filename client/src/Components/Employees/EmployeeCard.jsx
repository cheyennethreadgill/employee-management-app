import { Container, Button, Row, Form, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import PageHeaders from "../Global/PageHeaders";
import MyModal from "../Global/MyModal";

const EmployeeCard = ({
  show,
  handleShow,
  handleClose,
  onUpdateEmployeeState,
  onDelete,
  URL,
  employees,
  employeeid,
  firstname,
  lastname,
  degree,
  department,
  designation,
  mobile,
  email,
  date,
}) => {
  const PATH = "update-employee";
  // EDIT MODE
  const [editMode, setEditMode] = useState(false);
  const [btnValue, setBtnValue] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [foundEmployee, setFoundEmployee] = useState([]);

  // SET UPDATED INPUTS
  const [newDepartmentUpdated, setNewDepartmentUpdated] = useState(false);
  const [newDesignationUpdated, setNewDesignationUpdated] = useState(false);
  const [newEmailUpdated, setNewEmailUpdated] = useState(false);
  const [newFirstnameUpdated, setNewFirstnameUpdated] = useState(false);
  const [newLastnameUpdated, setNewLastnameUpdated] = useState(false);
  const [newMobileUpdated, setNewMobileUpdated] = useState(false);
  const [newDegreeUpdated, setNewDegreeUpdated] = useState(false);

  const [combinedName, setCombinedName] = useState("");
  let splitName = combinedName.split(" ");
  // SET NEW FORM
  const [newDepartment, setNewDepartment] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newMobile, setNewMobile] = useState(0);

  // SHOW UPDATE MODAL
  const handleBtnValue = (id) => {
    setBtnValue(id);
  };

  const handleEditMode = () => setEditMode(!editMode);

  // SEARCH EMPLOYEE
  const handleEmployeeSearch = (id) => {
    setEmployee(
      employees.filter((empl) => {
        const { employeeid } = empl;
        if (employeeid === id) {
          setEmployee(empl);
          return empl;
        }
      })
    );
  };

  // Find Employee
  const handleFindEmployee = (id) => {
    let found = employees.find((empl) => {
      const { employeeid } = empl;
      if (employeeid === id) {
        return empl;
      }
    });
    setFoundEmployee(found);
    console.log(found);
  };

  // UPDATE EMPLOYEE
  async function handleEmployeeUpdate(e, id) {
    e.preventDefault();

    // Post options
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeid: employeeid,
        fname: `${newFirstnameUpdated ? newFirstname : firstname}`,
        lname: `${newLastnameUpdated ? newLastname : lastname}`,
        degree: `${newDegreeUpdated ? newDegree : degree}`,
        mobile: `${newMobileUpdated ? newMobile : mobile}`,
        designation: `${newDesignationUpdated ? newDesignation : designation}`,
        department: `${newDepartmentUpdated ? newDepartment : department}`,
        email: `${newEmailUpdated ? newEmail : email}`,
      }),
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}${PATH}`, options);
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

  const [showNow, setShowNow] = useState(false);
  const handleShowNow = () => setShowNow(!showNow);

  return (
    <>
      {/* ***********************************************************MOBILE */}
      <section className="employee-card-mobile ">
        <Form
          autoComplete="true"
          className="employee-card-form"
        >
          <Row className="justify-content-between">
            <Col
              lg="1"
              style={{ width: "3%" }}
            >
              <Row style={{ justifyContent: "center" }}>
                <Col lg="12">
                  <Form.Control
                    style={{ margin: "0" }}
                    className="radio"
                    type="radio"
                    id=""
                  />
                </Col>
              </Row>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <p>Image</p>
                </Col>
                <Col lg="12">
                  <img
                    src=""
                    alt="picturrrrrr"
                  />
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <p>Employee ID: </p>
                </Col>
                <Col lg="12">
                  <p> {employeeid} </p>
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <p>Name: </p>
                </Col>
                <Col lg="12">
                  <p>
                    {newFirstnameUpdated
                      ? newFirstname + " " + newLastname
                      : firstname + " " + lastname}{" "}
                  </p>
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <p>Department </p>
                </Col>
                <Col lg="12">
                  <p>{newDepartmentUpdated ? newDepartment : department}</p>
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <p>Role</p>
                </Col>
                <Col lg="12">
                  <p>{newDesignationUpdated ? newDesignation : designation}</p>
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <p>Mobile</p>
                </Col>
                <Col lg="12">
                  <p> {newMobileUpdated ? newMobile : mobile} </p>
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <p>email</p>
                </Col>
                <Col lg="12">
                  <p> {newEmailUpdated ? newEmail : email} </p>
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <p>join date</p>
                </Col>
                <Col lg="12">
                  <p> {date} </p>
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col
                  lg="12"
                  className="col-6 d-none d-lg-block"
                >
                  <p>Actions</p>
                </Col>
                <Col lg="12">
                  <div className="form-btns">
                    <i
                      onClick={(e) => {
                        // handleEmployeeSearch(employeeid);
                        handleShow();
                        handleBtnValue(employeeid);
                        handleEditMode(employeeid);
                      }}
                      type="button"
                      className="fa-regular fa-pen-to-square fs-5 edit-btn"
                    ></i>
                    <i
                      onClick={() => {
                        onDelete(employeeid);
                        onUpdateEmployeeState(employeeid);
                      }}
                      type="submit"
                      className="fa-solid fa-trash delete-btn"
                    ></i>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </Form>
      </section>

      {/* ******************************************************DESKTOP */}
      <Row className="employee-card-desktop d-none d-md-flex">
        <div
          autoComplete="true"
          className="employee-card-desktop-form"
        >
          <div className="employee-card-desktop-form-fields">
            <Form.Control
              style={{ margin: "0" }}
              className="radio"
              type="radio"
              id=""
            />
          </div>

          <div className="employee-card-desktop-form-fields">
            <img
              src=""
              alt="picturrrrrr"
            />
          </div>

          <div className="employee-card-desktop-form-fields">
            <p> {employeeid} </p>
          </div>
          <div className="employee-card-desktop-form-fields">
            <p> {newDegreeUpdated ? newDegree : degree} </p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p>
              {newFirstnameUpdated
                ? newFirstname + " " + newLastname
                : firstname + " " + lastname}{" "}
            </p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p>{newDepartmentUpdated ? newDepartment : department}</p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p>{newDesignationUpdated ? newDesignation : designation}</p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p> {newMobileUpdated ? newMobile : mobile} </p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p> {newEmailUpdated ? newEmail : email} </p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p> {date} </p>
          </div>

          <div className="form-btns employee-card-desktop-form-fields">
            <i
              onClick={(e) => {
                // handleEmployeeSearch(employeeid);
                handleBtnValue(employeeid);
                handleEditMode();
                handleEmployeeSearch(employeeid);
                handleFindEmployee(employeeid);
                handleShowNow(true);
              }}
              type="button"
              className="fa-regular fa-pen-to-square fs-5 edit-btn"
            ></i>
            <i
              onClick={() => {
                onDelete(employeeid);
                onUpdateEmployeeState(employeeid);
              }}
              type="submit"
              className="fa-solid fa-trash delete-btn"
            ></i>
          </div>
          {/* END CONTAINER ROW */}
        </div>

        {/* **************************************************************************MODAL */}
        {/* <Modal
          show={show}
          onHide={handleClose}
          onEnter={(employeeid) => {
            handleFindEmployee(employeeid);
            console.log(foundEmployee);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fa-solid fa-user"></i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            +
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input"
                    defaultValue={
                      (btnValue === employeeid) & !newFirstnameUpdated
                        ? firstname + " " + lastname
                        : newFirstnameUpdated & (btnValue === employeeid)
                        ? newFirstname + " " + newLastname
                        : firstname + " " + lastname
                    }
                    type="text"
                    autoFocus
                    onChange={(e) => {
                      setNewFirstnameUpdated(true);
                      setNewLastnameUpdated(true);
                      setCombinedName(e.target.value);
                      setNewFirstname(splitName[0]);
                      setNewLastname(splitName[1]);
                    }}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-regular fa-user"></i>
                  </span>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Department</Form.Label>
                <div className="form-control-container">
                 
                  <Form.Control
                    name="department"
                    className="form-control-container-input"
                    defaultValue={
                      (btnValue === employeeid) & !newDepartmentUpdated
                        ? department
                        : newDepartmentUpdated & (btnValue === employeeid)
                        ? newDepartment
                        : department
                    }
                    type="text"
                    onChange={(e) => {
                      setNewDepartment(e.target.value);
                      setNewDepartmentUpdated(true);
                    }}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-solid fa-briefcase"></i>
                  </span>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Designation</Form.Label>
                <div className="form-control-container">
                  <Form.Control
                    name="designation"
                    className="form-control-container-input"
                    defaultValue={
                      (btnValue === employeeid) & !newDesignationUpdated
                        ? designation
                        : newDesignationUpdated & (btnValue === employeeid)
                        ? newDesignation
                        : designation
                    }
                    type="text"
                    onChange={(e) => {
                      setNewDesignation(e.target.value);
                      setNewDesignationUpdated(true);
                    }}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-regular fa-flag"></i>
                  </span>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Mobile</Form.Label>
                <div className="form-control-container">
                  <Form.Control
                    name="mobile"
                    className="form-control-container-input"
                    defaultValue={
                      (btnValue === employeeid) & !newMobileUpdated
                        ? mobile
                        : newMobileUpdated & (btnValue === employeeid)
                        ? newMobile
                        : mobile
                    }
                    type="number"
                    onChange={(e) => {
                      setNewMobile(e.target.value);
                      setNewMobileUpdated(true);
                    }}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Email</Form.Label>
                <div className="form-control-container">
                  <Form.Control
                    name="email"
                    className="form-control-container-input"
                    defaultValue={
                      (btnValue === employeeid) & !newEmailUpdated
                        ? email
                        : newEmailUpdated & (btnValue === employeeid)
                        ? newEmail
                        : email
                    }
                    type="text"
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                      setNewEmailUpdated(true);
                    }}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="close-btn"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className="update-btn"
              variant="primary"
              onClick={(e) => {
                handleClose();
                setEditMode(!editMode);
                handleEmployeeUpdate(e, employeeid);
                handleEmployeeUpdate(e, employeeid);
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal> */}
      </Row>

      {/* ***************************************************SHOW MODAL */}
      {!showNow ? null : (
        <MyModal
          showNow={showNow}
          degree={degree}
          newDegreeUpdated={newDegreeUpdated}
          setNewDegreeUpdated={setNewDegreeUpdated}
          newDegree={newDegree}
          setNewDegree={setNewDegree}
          handleShowNow={handleShowNow}
          setEditMode={setEditMode}
          editMode={editMode}
          employeeid={employeeid}
          setNewFirstname={setNewFirstname}
          setNewFirstnameUpdated={setNewFirstnameUpdated}
          newFirstnameUpdated={newFirstnameUpdated}
          newFirstname={newFirstname}
          newLastname={newLastname}
          firstname={firstname}
          lastname={lastname}
          setNewLastnameUpdated={setNewLastnameUpdated}
          setNewLastname={setNewLastname}
          setCombinedName={setCombinedName}
          splitName={splitName}
          department={department}
          newDepartment={newDepartment}
          setNewDepartment={setNewDepartment}
          newDepartmentUpdated={newDepartmentUpdated}
          setNewDepartmentUpdated={setNewDepartmentUpdated}
          designation={designation}
          newDesignationUpdated={newDesignationUpdated}
          setNewDesignationUpdated={setNewDesignationUpdated}
          newDesignation={newDesignation}
          setNewDesignation={setNewDesignation}
          handleEmployeeUpdate={handleEmployeeUpdate}
          mobile={mobile}
          newMobileUpdated={newMobileUpdated}
          setNewMobileUpdated={setNewMobileUpdated}
          newMobile={newMobile}
          setNewMobile={setNewMobile}
          email={email}
          newEmailUpdated={newEmailUpdated}
          setNewEmailUpdated={setNewEmailUpdated}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
        />
      )}
    </>
  );
};

export default EmployeeCard;
