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
  const handleFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // HANDLE NAME SPLIT
  // const getPromiseResponse = (e) => {
  //   return new Promise((resolve, reject) => {
  //     // waiting on the combined name
  //     handleFormData("combinedName", e);
  //     let combined = formData.combinedName;

  //     // logs/returns correctly
  //     resolve(combined);
  //     reject("ERROR");
  //   });
  // };
  // async function handleNameSplit() {
  //   const response = await getPromiseResponse();
  //   const splitName = response.split(" ");

  //   handleFormData("newFirstname", splitName[0]);
  //   handleFormData("newLastname", splitName[1]);

  //   handleInputForhandleEmployeeToUpdate({
  //     name1: splitName[0],
  //     name2: splitName[1],
  //   });
  // }

  // UPDATED PROJECT INFO (sent to all empployees)
  const [employeeToUpdate, setEmployeeToUpdate] = useState(employeeInfoForModal);
  // ****** works without code from name split

  // handle plit nae for employee to update
  const handleInputForhandleEmployeeToUpdate = (names) => {
    handleEmployeeToUpdate({ ...employeeInfoForModal, firstname: names.name1 });
    handleEmployeeToUpdate({ ...employeeInfoForModal, lastname: names.name2 });
  };
  // HANDLE EMPLOYEE TO UPDATE
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
                // getPromiseResponse(e.target.value);

                // ***combined name works
                // ***ks works
                // ***split name[0] works
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
          <label htmlFor="select-department"> Team</label>
          <select
            name="select department"
            id="select-department"
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

        <Form.Group className="form-group">
          <label htmlFor="image-upload">Upload Image</label>
          <Form.Control
            id="image-upload"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => {
              const file = e.target.files[0];
              handleFormUpdatedStatus("newImageUpdated", true);
              handleFormData("newImage", e.target.value);
              handleEmployeeToUpdate({ ...employeeInfoForModal, image: file.name });
              console.log(file.name);
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
          <Button
            className="update-btn"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              handleEditMode();
              // handleNameSplit();
              handleEmployeeUpdate(e, employeeid, employeeToUpdate);
              handleShowNow(false);
              // logs correctly when name split is commented out
              console.log(employeeToUpdate.image);

              // ***combined name works
              // ***ks works
              // ***split name[0] works
            }}
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default MyModal;
