import { Row, Form, Col } from "react-bootstrap";
import React, { useState } from "react";

const EmployeeCard = ({
  handleEditMode,
  handleShowNow,
  handleEmployeeSet,
  onUpdateEmployeeState,
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
  newEmployeeid,
  newFirstname,
  newLastname,
  newDepartment,
  newDesignation,
  newMobile,
  newEmail,
  newDegree,
  newImage,
  newEmployeeidUpdated,
  newFirstnameUpdated,
  newLastnameUpdated,
  newDepartmentUpdated,
  newDesignationUpdated,
  newMobileUpdated,
  newEmailUpdated,
  newDegreeUpdated,
  newImageUpdated,
  handleEmployeeUpdate,
  onDelete,
}) => {
  function ImageComponent({ image }) {
    if (!image || image === "  ") {
      return <i className="fa-solid fa-circle-user fs-2"></i>;
    }

    if (image && typeof image === "string" && image.trim()) {
      return (
        <img
          src={require(`../../../../server/images/${image.trim()}`)}
          // src={require(`../../images/${image.trim()}`)}
          alt="desktop img"
          height="35px"
          width="35px"
          className="employee-card-img"
        />
      );
    }
  }

  // EDIT MODE
  const [btnValue, setBtnValue] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [foundEmployee, setFoundEmployee] = useState([]);

  // SHOW UPDATE MODAL
  const handleBtnValue = (id) => setBtnValue(id);

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
                  <ImageComponent image={image} />
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
                  <h3>Degree: </h3>
                </Col>
                <Col lg="12">
                  <p>{newDegreeUpdated ? newDegree : degree} </p>
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
                  <h3>Designation</h3>
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
                        handleBtnValue(employeeid);
                        handleEditMode();
                        handleShowNow(true);
                        handleEmployeeSet({
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
                          newEmployeeid,
                          newFirstname,
                          newLastname,
                          newDepartment,
                          newDesignation,
                          newMobile,
                          newEmail,
                          newDegree,
                          newImage,
                          newEmployeeidUpdated,
                          newFirstnameUpdated,
                          newLastnameUpdated,
                          newDepartmentUpdated,
                          newDesignationUpdated,
                          newMobileUpdated,
                          newEmailUpdated,
                          newDegreeUpdated,
                          newImageUpdated,
                        });
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
            <ImageComponent image={image} />
          </div>

          <div className="employee-card-desktop-form-fields">
            <p> {employeeid} </p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p>{newFirstnameUpdated ? newFirstname + " " + newLastname : firstname + " " + lastname} </p>
          </div>

          <div className="employee-card-desktop-form-fields">
            <p> {newDegreeUpdated ? newDegree : degree ? degree : "none"} </p>
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
                handleBtnValue(employeeid);
                handleEditMode();
                handleShowNow(true);
                handleEmployeeSet({
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
                  newEmployeeid,
                  newFirstname,
                  newLastname,
                  newDepartment,
                  newDesignation,
                  newMobile,
                  newEmail,
                  newDegree,
                  newImage,
                  newEmployeeidUpdated,
                  newFirstnameUpdated,
                  newLastnameUpdated,
                  newDepartmentUpdated,
                  newDesignationUpdated,
                  newMobileUpdated,
                  newEmailUpdated,
                  newDegreeUpdated,
                  newImageUpdated,
                });
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
    </>
  );
};

export default EmployeeCard;
