import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const MyModal = ({
  employeeid,
  firstname,
  lastname,
  department,
  designation,
  degree,
  email,
  image,
  mobile,
  handleEditMode,
  handleShowNow,
  handleEmployeeUpdate,
  employeeInfoForModal,
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

  // SET/HANDLE NEW FORM
  const [formData, setFormData] = useState({
    combinedName: "",
    newFirstname: "",
    newLastname: "",
    newDepartment: "",
    newDegree: "",
    newDesignation: "",
    newEmail: "",
    newMobile: 0,
    newImage: null,
  });

  const handleFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // handle names for form data
  const handleNameForFormData = (fname, lname) => {
    setFormData({ ...formData, newFirstname: fname, newLastname: lname, combinedName: fname + " " + lname });
  };
  const handleNameStatus = (fnamestatus, lnamestatus) => {
    setFormUpdatedStatus({
      ...formUpdatedStatus,
      [fnamestatus]: true,
      [lnamestatus]: true,
    });
  };

  // UPDATED PROJECT INFO
  // HANDLE EMPLOYEE TO UPDATE
  const [employeeToUpdate, setEmployeeToUpdate] = useState({
    employeeid: employeeInfoForModal.employeeid,
    firstname: employeeInfoForModal.firstname,
    lastname: employeeInfoForModal.lastname,
    degree: employeeInfoForModal.degree,
    department: employeeInfoForModal.department,
    designation: employeeInfoForModal.designation,
    email: employeeInfoForModal.email,
    image: employeeInfoForModal.image,
    mobile: employeeInfoForModal.mobile,
  });

  //handle EMPLOYEE UPDATE (EIFM from all empl)
  const handleEmployeeToUpdate = (values) => setEmployeeToUpdate(values);

  return (
    <section className="my-modal">
      <Form
        className="my-modal-form"
        encType="multiform/form-data"
      >
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
                handleNameStatus("newFirstnameUpdated", "newLastnameUpdated");

                // handle name split(last char append)
                let nameInput = e.target.value;
                let splitIndex = nameInput.lastIndexOf(" ");
                let fname = nameInput.substring(0, splitIndex);
                let lname = nameInput.substring(splitIndex + 1);

                handleNameForFormData(fname, lname);
                handleEmployeeToUpdate({ ...employeeToUpdate, firstname: fname, lastname: lname });
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
              onChange={(e) => {
                handleFormUpdatedStatus("newDegreeUpdated", true);
                handleFormData("newDegree", e.target.value);
                handleEmployeeToUpdate({ ...employeeToUpdate, degree: e.target.value });
              }}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-user"></i>
            </span>
          </div>
        </Form.Group>

        {/* *******************************DEPARTMENT */}
        <fieldset>
          <label htmlFor="select-department"> Team</label>
          <select
            name="select department"
            id="select-department"
            onChange={(e) => {
              handleFormUpdatedStatus("newDepartmentUpdated", true);
              handleFormData("newDepartment", e.target.value);
              handleEmployeeToUpdate({ ...employeeToUpdate, department: e.target.value });
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
                handleEmployeeToUpdate({ ...employeeToUpdate, designation: e.target.value });
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
                handleEmployeeToUpdate({ ...employeeToUpdate, mobile: e.target.value });
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
                handleEmployeeToUpdate({ ...employeeToUpdate, email: e.target.value });
              }}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-envelope"></i>
            </span>
          </div>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Control
            type="file"
            accept=".png, .jpg, .jpeg"
            name="image"
            onChange={(e) => {
              handleFormUpdatedStatus("newImageUpdated", true);
              handleFormData("newImage", (e.target as HTMLInputElement).files[0]);
              handleEmployeeToUpdate({ ...employeeToUpdate, image: (e.target as HTMLInputElement).files[0] });
              console.log((e.target as HTMLInputElement).files[0]);
            }}
            placeholder={formUpdatedStatus.newImageUpdated ? formData.newImage : image}
          />
        </Form.Group>

        <div className="form-btns">
          <Button
            className="close-btn"
            variant="secondary"
            onClick={() => handleShowNow(false)}
          >
            Close
          </Button>
          <Form.Control
            value="Save Changes"
            className="btn update-btn text-light"
            onClick={(e) => {
              handleEditMode();
              handleEmployeeUpdate(employeeid, employeeToUpdate);
              handleShowNow(false);
            }}
            type="submit"
          />
          {/* Save Changes
          </input> */}
        </div>
      </Form>
    </section>
  );
};

export default MyModal;
