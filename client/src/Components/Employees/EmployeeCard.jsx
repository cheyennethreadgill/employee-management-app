import { Container, Button, Row, Form, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import MyModal from "../Global/MyModal";

const EmployeeCard = ({
  handleShow,
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
  image,
}) => {
  const PATH = "update-employee";
  const IMG_URL = "../../../../client/src/images/";
  // EDIT MODE
  const [editMode, setEditMode] = useState(false);
  const [btnValue, setBtnValue] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [foundEmployee, setFoundEmployee] = useState([]);
  const [showNow, setShowNow] = useState(false);

  const handleShowNow = () => setShowNow(!showNow);
  const handleEditMode = () => setEditMode(!editMode);
  // SHOW UPDATE MODAL
  const handleBtnValue = (id) => setBtnValue(id);

  // SET UPDATED INPUTS
  const [newDepartmentUpdated, setNewDepartmentUpdated] = useState(false);
  const [newDesignationUpdated, setNewDesignationUpdated] = useState(false);
  const [newEmailUpdated, setNewEmailUpdated] = useState(false);
  const [newFirstnameUpdated, setNewFirstnameUpdated] = useState(false);
  const [newLastnameUpdated, setNewLastnameUpdated] = useState(false);
  const [newMobileUpdated, setNewMobileUpdated] = useState(false);
  const [newDegreeUpdated, setNewDegreeUpdated] = useState(false);
  const [newImageUpdated, setNewImageUpdated] = useState(false);

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
  const [newImage, setNewImage] = useState("");

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
        image: `${newImageUpdated ? newImage : image}`,
      }),
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}${PATH}`, options);
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

  // Image Name extraction
  function extractFilename() {
    if (image) {
      if (image.substring(0, 12) == "C:\\fakeimage\\") return image.substring(12); // modern browser

      var x;
      x = image.lastIndexOf("\\");
      if (x >= 0) return image.substring(x + 1); // Windows-based image
    } else {
      console.log("no path found");
      return;
    }
  }
  const fileName = extractFilename();

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
                  <h3>Image</h3>
                </Col>
                <Col lg="12">
                  {fileName ? (
                    <img
                      src={fileName ? require(`../../../../client/src/images/${fileName}`) : null}
                      alt="desktop img"
                      height="35px"
                      width="35px"
                      className="employee-card-img"
                    />
                  ) : (
                    <i className="fa-solid fa-circle-user fs-1"></i>
                  )}
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <h3>Employee ID: </h3>
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
                  <h3>Name: </h3>
                </Col>
                <Col lg="12">
                  <p>{newFirstnameUpdated ? newFirstname + " " + newLastname : firstname + " " + lastname} </p>
                </Col>
              </div>
            </Col>
            <hr className="d-block d-lg-none" />
            <Col lg="1">
              <div className="employee-card-mobile-fields">
                <Col lg="12">
                  <h3>Department </h3>
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
                  <h3>Role</h3>
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
                  <h3>Mobile</h3>
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
                  <h3>email</h3>
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
                  <h3>join date</h3>
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
            {fileName ? (
              <img
                src={fileName ? require(`../../../../client/src/images/${fileName}`) : null}
                alt="desktop img"
                height="35px"
                width="35px"
                className="employee-card-img"
              />
            ) : (
              <i className="fa-solid fa-circle-user fs-2"></i>
            )}
          </div>

          <div className="employee-card-desktop-form-fields">
            <p> {employeeid} </p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p>{newFirstnameUpdated ? newFirstname + " " + newLastname : firstname + " " + lastname} </p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p> {newDegreeUpdated ? newDegree : degree} </p>
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
      </Row>
      <hr className="d-none d-md-block" />

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
          image={image}
          newImageUpdated={newImageUpdated}
          setNewImageUpdated={setNewImageUpdated}
          newImage={newImage}
          setNewImage={setNewImage}
        />
      )}
    </>
  );
};

export default EmployeeCard;
