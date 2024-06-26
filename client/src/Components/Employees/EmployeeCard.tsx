import { useState } from "react";
import { Row, Form, Col } from "react-bootstrap";
import { toSentenceCase } from "../../Helpers/strings";
import ImageComponent from "./ImageComponent";

const EmployeeCard = ({
  handleEditMode,
  handleShowNow,
  handleEmployeeSetForModal,
  onUpdateEmployeeState,
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
  onDelete,
}) => {
  interface Conditionals {
    updateStatus: boolean;
    newEntry: string | null;
    originalEntry: string[];
  }
  const employeeCardConditionals: Conditionals[] = [
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
    {
      updateStatus: newDegreeUpdated,
      newEntry: newDegree,
      originalEntry: [degree ? toSentenceCase(degree) : " N/A"],
    },
    {
      updateStatus: newDepartmentUpdated,
      newEntry: newDepartment,
      originalEntry: [department ? toSentenceCase(department) : department ? "Deparment" : "N/A"],
    },
    {
      updateStatus: newDesignationUpdated,
      newEntry: newDesignation,
      originalEntry: [designation ? toSentenceCase(designation) : designation ? "Designation" : "N/A"],
    },
    {
      updateStatus: newMobileUpdated,
      newEntry: newMobile,
      originalEntry: [mobile ? mobile : mobile ? "Mobile" : "N/A"],
    },
    {
      updateStatus: newEmailUpdated,
      newEntry: newEmail,
      originalEntry: [email ? toSentenceCase(email) : email ? "Email" : "N/A"],
    },

    {
      updateStatus: null,
      newEntry: null,
      originalEntry: [date, "Join Date"],
    },
  ];
  // EDIT MODE
  const [btnValue, setBtnValue] = useState(0);
  const [foundEmployee, setFoundEmployee] = useState([]);

  // SHOW UPDATE MODAL
  const handleBtnValue = (id: number) => setBtnValue(id);

  return (
    <>
      {/* ******************************************************************************MOBILE */}
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
                  <Form.Label htmlFor="employee-entry">
                    <Form.Control
                      style={{ margin: "0" }}
                      className="radio"
                      type="radio"
                      name="employee-entry"
                    />
                  </Form.Label>
                </Col>
              </Row>
            </Col>

            {/* **********************************CARD INFO */}
            {employeeCardConditionals.map((condition) => {
              const { updateStatus, newEntry, originalEntry } = condition;

              if (originalEntry[0] == image) {
                return (
                  <Col
                    key={"img-id-1"}
                    lg="1"
                    xs={{ order: 1 }}
                  >
                    <hr className="d-block d-lg-none" />
                    <div className="employee-card-mobile-fields">
                      <Col lg="12">
                        <h3> {originalEntry[1]} </h3>
                      </Col>
                      <Col lg="12">
                        <ImageComponent
                          navImage={null}
                          image={originalEntry[0]}
                        />
                      </Col>
                    </div>
                  </Col>
                );
              } else if (originalEntry[0] == employeeid) {
                return (
                  <Col
                    key={Math.random()}
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
                    key={Math.random()}
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
                  <button
                    onClick={() => {
                      handleBtnValue(employeeid);
                      handleEditMode();
                      handleShowNow(true);
                      handleEmployeeSetForModal({
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
                    className="fa-regular fa-pen-to-square fs-5 edit-btn btn-none"
                    aria-label="edit employee"
                  ></button>
                  <button
                    onClick={() => {
                      onDelete(email);
                      onUpdateEmployeeState(employeeid);
                    }}
                    type="submit"
                    className="fa-solid fa-trash delete-btn"
                    aria-label="delete employee"
                  ></button>
                </div>
              </Col>
            </div>
          </Col>
        </Form>
      </section>

      {/* *********************************************************************************DESKTOP */}
      <Row className="employee-card-desktop d-none d-md-flex">
        <div className="employee-card-desktop-form">
          <div className="employee-card-desktop-form-fields">
            <Form.Label htmlFor="employee-entry">
              <Form.Control
                style={{ margin: "0" }}
                className="radio"
                type="radio"
                name="employee-entry"
              />
            </Form.Label>
          </div>

          {/* **********************************CARD INFO */}
          {employeeCardConditionals.map((condition) => {
            const { updateStatus, newEntry, originalEntry } = condition;

            if (originalEntry[0] == image) {
              return (
                <div
                  key={originalEntry[1]}
                  className="employee-card-desktop-form-fields"
                >
                  <ImageComponent
                    navImage={null}
                    image={originalEntry[0]}
                  />
                </div>
              );
            }
            // else if ( originalEntry[0] == employeeid ) {
            //   return (
            //     <Col
            //       lg="1"
            //       key={originalEntry[0]}
            //     >
            //       <hr className="d-block d-lg-none" />
            //       <div className="employee-card-mobile-fields">
            //         <Col lg="12">
            //           <p> {employeeid} </p>
            //         </Col>
            //       </div>
            //     </Col>
            //   );
            // }
            else {
              return (
                <div
                  key={Math.random()}
                  className="employee-card-desktop-form-fields"
                >
                  <p> {updateStatus ? newEntry : originalEntry ? originalEntry[0] : "N/A"} </p>
                </div>
              );
            }
          })}

          {/* **********************************ACTIONS */}
          <div className="form-btns employee-card-desktop-form-fields">
            <button
              onClick={() => {
                handleBtnValue(employeeid);
                handleEditMode();
                handleShowNow(true);
                handleEmployeeSetForModal({
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
              type="submit"
              className="fa-regular fa-pen-to-square fs-5 edit-btn employee-card-form-btns"
              aria-label="edit employee"
            ></button>
            <button
              onClick={() => {
                onDelete(email);
                onUpdateEmployeeState(employeeid);
              }}
              type="button"
              className="fa-solid fa-trash delete-btn employee-card-form-btns btn-none"
              aria-label="delete employee"
            ></button>
          </div>
          {/* END CONTAINER ROW */}
        </div>
      </Row>
    </>
  );
};

export default EmployeeCard;
