import { Container, Button, Row, Form, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import PageHeaders from "../Global/PageHeaders";

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
  const [employee, setEmployee] = useState("");

  // SET UPDATED INPUTS
  const [newDepartmentUpdated, setNewDepartmentUpdated] = useState(false);
  const [newDesignationUpdated, setNewDesignationUpdated] = useState(false);
  const [newEmailUpdated, setNewEmailUpdated] = useState(false);
  const [newFirstnameUpdated, setNewFirstnameUpdated] = useState(false);
  const [newLastnameUpdated, setNewLastnameUpdated] = useState(false);
  const [newMobileUpdated, setNewMobileUpdated] = useState(false);

  const [combinedName, setCombinedName] = useState("");
  let splitName = combinedName.split(" ");
  // SET NEW FORM
  const [newDepartment, setNewDepartment] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newMobile, setNewMobile] = useState("");

  // SHOW UPDATE MODAL
  const handleBtnValue = (id) => setBtnValue(id);
  const handleEditMode = () => setEditMode(!editMode);

  // SEARCH EMPLOYEE
  const handleEmployeeSearch = (id) => {
    setEmployee(
      employees.filter((employee) => {
        const { employeeid } = employee;
        if (employeeid === id) {
          return employee;
        }
      })
    );
  };

  // UPDATE EMPLOYEE
  async function handleEmployeeUpdate(e, id) {
    e.preventDefault();

    // Post options
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeid: employee[0].employeeid,
        fname: `${newFirstnameUpdated ? newFirstname : employee[0].firstname}`,
        lname: `${newLastnameUpdated ? newLastname : employee[0].lastname}`,
        mobile: `${newMobileUpdated ? newMobile : employee[0].mobile}`,
        designation: `${
          newDesignationUpdated ? newDesignation : employee[0].designation
        }`,
        department: `${
          newDepartmentUpdated ? newDepartment : employee[0].department
        }`,
        email: `${newEmailUpdated ? newEmail : employee[0].email}`,
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

  return (
    <Container>
      <Row>
        <Form
          autoComplete="true"
          className="employee-form"
        >
          <Row className="justify-content-between">
            <Col
              lg="1"
              style={{ width: "3%" }}
            >
              <Row style={{ justifyContent: "center" }}>
                <Col
                  lg="12"
                  className="col-6"
                >
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
              <Row>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>Image</p>
                </Col>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <img
                    src=""
                    alt="picturrrrrr"
                  />
                </Col>
              </Row>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <Row>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>Employee ID: </p>
                </Col>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p> {employeeid} </p>
                </Col>
              </Row>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <Row>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>Name: </p>
                </Col>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>
                    {" "}
                    {newFirstnameUpdated
                      ? newFirstname + " " + newLastname
                      : firstname + " " + lastname}{" "}
                  </p>
                </Col>
              </Row>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <Row>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>Department </p>
                </Col>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>{newDepartmentUpdated ? newDepartment : department}</p>
                </Col>
              </Row>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <Row>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>Role</p>
                </Col>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>{newDesignationUpdated ? newDesignation : designation}</p>
                </Col>
              </Row>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <Row>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>Mobile</p>
                </Col>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p> {newMobileUpdated ? newMobile : mobile} </p>
                </Col>
              </Row>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <Row>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>email</p>
                </Col>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p> {newEmailUpdated ? newEmail : email} </p>
                </Col>
              </Row>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <Row>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p>join date</p>
                </Col>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <p> {date} </p>
                </Col>
              </Row>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <Row>
                <Col
                  lg="12"
                  className="col-6 d-none d-lg-block"
                >
                  <p>Actions</p>
                </Col>
                <Col
                  lg="12"
                  className="col-6"
                >
                  <div className="form-btns">
                    <i
                      onClick={(e) => {
                        handleEmployeeSearch(employeeid);
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
              </Row>
            </Col>

            {/* END CONTAINER ROW */}
          </Row>
        </Form>

        {/* *********************************MODAL */}
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="modal-100vh"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="fa-solid fa-user"></i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input"
                    nam
                    e="name"
                    defaultValue={
                      (btnValue === employeeid) & !newFirstnameUpdated
                        ? firstname + " " + lastname
                        : newFirstnameUpdated & (btnValue === employeeid)
                        ? newFirstname + " " + newLastname
                        : firstname + " " + "lastname"
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
                    placeholder={
                      (btnValue === employeeid) & !newFirstnameUpdated
                        ? firstname + " " + lastname
                        : newFirstnameUpdated & (btnValue === employeeid)
                        ? newFirstname + " " + newLastname
                        : firstname + " " + "lastname"
                    }
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
                  {" "}
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
                    placeholder={
                      (btnValue === employeeid) & !newDepartmentUpdated
                        ? department
                        : newDepartmentUpdated & (btnValue === employeeid)
                        ? newDepartment
                        : department
                    }
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
                    placeholder={
                      (btnValue === employeeid) & !newDesignationUpdated
                        ? designation
                        : newDesignationUpdated & (btnValue === employeeid)
                        ? newDesignation
                        : designation
                    }
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
                    placeholder={
                      (btnValue === employeeid) & !newMobileUpdated
                        ? mobile
                        : newMobileUpdated & (btnValue === employeeid)
                        ? newMobile
                        : mobile
                    }
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
                    placeholder={
                      (btnValue === employeeid) & !newEmailUpdated
                        ? email
                        : newEmailUpdated & (btnValue === employeeid)
                        ? newEmail
                        : email
                    }
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
        </Modal>
      </Row>
    </Container>
  );
};

export default EmployeeCard;
