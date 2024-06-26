import { useState } from "react";
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
  interface employeeToUpdateInterface {
    firstname: string;
    lastname: string;
    department: string;
    degree: string;
    designation: string;
    email: string;
    mobile: string;
    image: File;
  }

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
  const handleFormUpdatedStatus = (key: string, value: boolean) => {
    setFormUpdatedStatus({ ...formUpdatedStatus, [key]: value });
  };

  // SET/HANDLE NEW FORM
  const [formData, setFormData] = useState({
    newFirstname: "",
    newLastname: "",
    newDepartment: "",
    newDegree: "",
    newDesignation: "",
    newEmail: "",
    newMobile: 0,
    newImage: null,
    combinedName: "",
  });
  const handleFormData = (key: string, value: string | File) => {
    setFormData({ ...formData, [key]: value });
  };

  console.log(formData.combinedName);
  // cutting off last name here
  // HANDLE NAME SPLIT
  const getCombinedName = (e: string): Promise<string> => {
    handleFormData("combinedName", e);
    // only works when you hit space
    console.log(formData.combinedName);
    // the e works but combined name
    console.log(e);
    return new Promise((resolve, reject) => {
      // waiting on the combined name
      console.log(formData.combinedName);
      let combined = formData.combinedName;
      console.log(e);
      // cutting off last name here
      console.log(combined);
      resolve(combined);
      reject("ERROR");
    });
  };

  console.log(formData.combinedName);

  async function splitName(e: string) {
    const response = await getCombinedName(e);
    const splitName = response.split(" ");

    handleFormData("newFirstname", splitName[0]);
    handleFormData("newLastname", splitName[1]);

    handleInputForhandleEmployeeToUpdate({
      firstname: splitName[0],
      lastname: splitName[1],
    });

    console.log(splitName[0] + splitName[1]);
  }

  // UPDATED PROJECT INFO

  // ****** works without code from name split

  // handle plit name for employee to update
  const handleInputForhandleEmployeeToUpdate = (names: { firstname: string; lastname: string }) => {
    handleEmployeeToUpdate({ ...employeeToUpdate, ...names });
  };

  // HANDLE EMPLOYEE TO UPDATE
  const [employeeToUpdate, setEmployeeToUpdate] = useState({
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
  const handleEmployeeToUpdate = (values: employeeToUpdateInterface) => setEmployeeToUpdate(values);

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
              onKeyDown={(e) => {
                handleFormUpdatedStatus("newFirstnameUpdated", true);
                handleFormUpdatedStatus("newLastnameUpdated", true);
                getCombinedName((e.target as HTMLInputElement).value);
              }}
              onBeforeInput={(e) => {
                splitName((e.target as HTMLInputElement).value);
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
              console.log((e.target as HTMLInputElement).files[0]);
              handleFormUpdatedStatus("newImageUpdated", true);
              handleFormData("newImage", (e.target as HTMLInputElement).files[0]);
              handleEmployeeToUpdate({ ...employeeToUpdate, image: (e.target as HTMLInputElement).files[0] });
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
          <input
            value="Save Changes"
            className="btn update-btn text-light"
            onClick={(e) => {
              handleEditMode();
              handleEmployeeUpdate(e, employeeid, employeeToUpdate);
              handleShowNow(false);
              console.log(formData.newFirstname + formData.newLastname);
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
