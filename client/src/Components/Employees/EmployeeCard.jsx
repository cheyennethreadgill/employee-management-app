import { Row, Form, Col } from "react-bootstrap";
import React, { useState } from "react";
import ImageComponent from "./EmployeeImageComponent";
import { toSentenceCase } from "../../Helpers/strings";

const EmployeeCard = ({
  handleShowDeletePrompt,
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
  const employeeCardConditionals = [
    { updateStatus: null, newEntry: null, originalEntry: [image, "Image"] },
    {
      updateStatus: null,
      newEntry: null,
      originalEntry: [employeeid, "Employee ID"],
    },
    {
      updateStatus: newFirstnameUpdated,
      newEntry: newFirstname + " " + newLastname,
      originalEntry: [firstname + " " + lastname, "Name"],
    },
    { updateStatus: newDegreeUpdated, newEntry: newDegree, originalEntry: [toSentenceCase(degree), "Degree"] },
    {
      updateStatus: newDepartmentUpdated,
      newEntry: newDepartment,
      originalEntry: [toSentenceCase(department), "Deparment"],
    },
    {
      updateStatus: newDesignationUpdated,
      newEntry: newDesignation,
      originalEntry: [toSentenceCase(designation), "Designation"],
    },
    { updateStatus: newMobileUpdated, newEntry: newMobile, originalEntry: [toSentenceCase(mobile), "Mobile"] },
    { updateStatus: newEmailUpdated, newEntry: newEmail, originalEntry: [toSentenceCase(email), "Email"] },

    {
      updateStatus: null,
      newEntry: null,
      originalEntry: [date, "Join Date"],
    },
  ];
  // EDIT MODE
  const [btnValue, setBtnValue] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [foundEmployee, setFoundEmployee] = useState([]);

  // SHOW UPDATE MODAL
  const handleBtnValue = (id) => setBtnValue(id);

  return (
    <>
      {/* ***********************************************************MOBILE */}
      <section className="employee-card-mobile">
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

            {/* **********************************CARD INFO */}
            {employeeCardConditionals.map((condition) => {
              const { updateStatus, newEntry, originalEntry } = condition;

              // const letter = originalEntry[0].charAt(1);

              if (originalEntry[0] == image) {
                return (
                  <Col
                    key={originalEntry}
                    lg="1"
                    xs={{ order: 1 }}
                  >
                    <hr className="d-block d-lg-none" />
                    <div className="employee-card-mobile-fields">
                      <Col lg="12">
                        <h3> {originalEntry[1]} </h3>
                      </Col>
                      <Col lg="12">
                        <ImageComponent image={originalEntry[0]} />
                      </Col>
                    </div>
                  </Col>
                );
              } else if (originalEntry[0] == employeeid) {
                return (
                  <Col
                    key={originalEntry}
                    lg="1"
                    xs={{ order: 2 }}
                  >
                    <hr className="d-block d-lg-none" />
                    <div className="employee-card-mobile-fields">
                      <Col lg="12">
                        <h3>{originalEntry[1]}</h3>
                      </Col>
                      <Col lg="12">
                        <p> {originalEntry[0]} </p>
                      </Col>
                    </div>
                  </Col>
                );
              } else {
                return (
                  <Col
                    key={originalEntry}
                    lg="1"
                    xs={{ order: 2 }}
                  >
                    <hr className="d-block d-lg-none" />
                    <div className="employee-card-mobile-fields">
                      <Col lg="12">
                        <h3>{originalEntry[1]}</h3>
                      </Col>
                      <Col lg="12">
                        <p> {updateStatus ? newEntry : originalEntry[0]} </p>
                      </Col>
                    </div>
                  </Col>
                );
              }
            })}
          </Row>

          {/* **********************************ACTIONS */}
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

          {/* **********************************CARD INFO */}
          {employeeCardConditionals.map((condition) => {
            const { updateStatus, newEntry, originalEntry } = condition;

            if (originalEntry[0] == image) {
              return (
                <div
                  key={originalEntry}
                  className="employee-card-desktop-form-fields"
                >
                  <ImageComponent image={originalEntry[0]} />
                </div>
              );
            } else if (originalEntry[0] == employeeid) {
              return (
                <Col
                  lg="1"
                  key={originalEntry}
                >
                  <hr className="d-block d-lg-none" />
                  <div className="employee-card-mobile-fields">
                    <Col lg="12">
                      <p> {employeeid} </p>
                    </Col>
                  </div>
                </Col>
              );
            } else {
              return (
                <div
                  key={originalEntry}
                  className="employee-card-desktop-form-fields"
                >
                  <p> {updateStatus ? newEntry : originalEntry ? originalEntry[0] : "N/A"} </p>
                </div>
              );
            }
          })}

          {/* **********************************ACTIONS */}
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
