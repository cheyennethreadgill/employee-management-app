import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const MyModal = ({
  employeeInfoForModal,
  handleEditMode,
  handleShowNow,
  employeeid,
  firstname,
  lastname,
  department,
  designation,
  degree,
  email,
  image,
  handleEmployeeUpdate,
  mobile,
}) => {
  // Updated Form Status
  const [formUpdatedStatus, setFormUpdatedStatus] = useState({
    newFirstnameUpdated: false,
    newLastnameUpdated: false,
    newDepartmentUpdated: false,
    newDesignationUpdated: false,
    newEmailUpdated: false,
    newMobileUpdated: false,
    newDegreeUpdated: false,
    newImageUpdated: false,
  });
  const handleFormUpdatedStatus = (key, value) => {
    setFormUpdatedStatus({ ...formUpdatedStatus, [key]: value });
  };

  // SET NEW FORM
  const [formData, setFormData] = useState({
    newFirstname: "",
    newLastname: "",
    newDepartment: "",
    newDegree: "",
    newDesignation: "",
    newEmail: "",
    newMobile: 0,
    newImage: "",
    combinedName: "",
  });
  let ks = formData.combinedName;
  var splitName = ks.split(" ");
  const handleFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // UPDATED PROJECT INFO
  const [employeeToUpdate, setEmployeeToUpdate] = useState(employeeInfoForModal);

  const handleEmployeeToUpdate = (values) => setEmployeeToUpdate(values);

  return (
    <section className="my-modal">
      <Form className="my-modal-form">
        {/* *******************************NAME */}
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Name</Form.Label>
          <div className="form-control-container ">
            <Form.Control
              className="form-control-container-input"
              defaultValue={
                formUpdatedStatus.newFirstnameUpdated
                  ? formData.newFirstname + " " + formData.newLastname
                  : firstname + " " + lastname
              }
              type="text"
              autoFocus
              onChange={(e) => {
                handleFormUpdatedStatus("newFirstnameUpdated", true);
                handleFormUpdatedStatus("newLastnameUpdated", true);

                handleFormData("combinedName", e.target.value);

                handleFormData("newFirstname", splitName[0]);
                handleFormData("newLastname", splitName[1]);

                handleEmployeeToUpdate({ ...employeeInfoForModal, firstname: splitName[0] });
                handleEmployeeToUpdate({ ...employeeInfoForModal, lastname: splitName[1] });
              }}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-user"></i>
            </span>
          </div>
        </Form.Group>

        {/* *******************************DEGREE */}
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Degree</Form.Label>
          <div className="form-control-container ">
            <Form.Control
              className="form-control-container-input"
              defaultValue={formUpdatedStatus.newDegreeUpdated ? formData.newDegree : degree}
              type="text"
              autoFocus
              onChange={(e) => {
                handleFormUpdatedStatus("newDegreeUpdated", true);
                handleFormData("newDegree", e.target.value);
                handleEmployeeToUpdate({ ...employeeInfoForModal, degree: e.target.value });
              }}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-user"></i>
            </span>
          </div>
        </Form.Group>

        {/* *******************************DEPARTMENT */}
        <fieldset>
          <select
            name="select department"
            id="select department"
            onChange={(e) => {
              handleFormUpdatedStatus("newDepartmentUpdated", true);
              handleFormData("newDepartment", e.target.value);
              handleEmployeeToUpdate({ ...employeeInfoForModal, department: e.target.value });
            }}
            required={true}
            defaultValue={formUpdatedStatus.newDepartmentUpdated ? formData.newDepartment : department}
          >
            <option value="development">Development</option>
            <option value="designing">Designing</option>
            <option value="testing">Testing</option>
            <option value="hr">HR</option>
          </select>
        </fieldset>

        {/* *******************************Designation */}
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Designation</Form.Label>
          <div className="form-control-container">
            <Form.Control
              name="designation"
              className="form-control-container-input"
              defaultValue={formUpdatedStatus.newDesignationUpdated ? formData.newDesignation : designation}
              type="text"
              onChange={(e) => {
                handleFormData("newDesignation", e.target.value);
                handleFormUpdatedStatus("newDesignationUpdated", true);
                handleEmployeeToUpdate({ ...employeeInfoForModal, designation: e.target.value });
              }}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-flag"></i>
            </span>
          </div>
        </Form.Group>

        {/* *******************************MOBILE */}
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Mobile</Form.Label>
          <div className="form-control-container">
            <Form.Control
              name="mobile"
              className="form-control-container-input"
              defaultValue={formUpdatedStatus.newMobileUpdated ? formData.newMobile : mobile}
              type="text"
              onChange={(e) => {
                handleFormData("newMobile", e.target.value);
                handleFormUpdatedStatus("newMobileUpdated", true);
                handleEmployeeToUpdate({ ...employeeInfoForModal, mobile: e.target.value });
              }}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-solid fa-phone"></i>
            </span>
          </div>
        </Form.Group>

        {/* *******************************EMAIL */}
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Email</Form.Label>
          <div className="form-control-container">
            <Form.Control
              name="email"
              className="form-control-container-input"
              defaultValue={formUpdatedStatus.newEmailUpdated ? formData.newEmail : email}
              type="text"
              onChange={(e) => {
                handleFormUpdatedStatus("newEmailUpdated", true);
                handleFormData("newEmail", e.target.value);
                handleEmployeeToUpdate({ ...employeeInfoForModal, email: e.target.value });
              }}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-envelope"></i>
            </span>
          </div>
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => {
              handleFormUpdatedStatus("newImageUpdated", true);
              handleFormData("newImage", e.target.value);
              handleEmployeeToUpdate({ ...employeeInfoForModal, image: e.target.value });
            }}
          />
        </Form.Group>

        <Button
          className="close-btn"
          variant="secondary"
          onClick={() => handleShowNow(false)}
        >
          Close
        </Button>
        <Button
          className="update-btn"
          variant="primary"
          onClick={(e) => {
            handleEditMode();
            handleEmployeeUpdate(e, employeeid, employeeToUpdate);
            handleShowNow(false);
          }}
        >
          Save Changes
        </Button>
      </Form>
    </section>
  );
};

export default MyModal;
