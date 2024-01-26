import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";

const MyModal = ({
  editMode,
  setEditMode,
  handleShowNow,

  employeeid,
  firstname,
  lastname,
  department,
    designation,
  degree,

  newFirstname,
  newLastname,
  newDepartment,
  newDesignation,

  setNewLastname,
  setNewFirstname,
  setNewDepartment,
  setNewDesignation,

  newFirstnameUpdated,
  setCombinedName,
  splitName,
  newDepartmentUpdated,
  newDesignationUpdated,

  setNewFirstnameUpdated,
  setNewLastnameUpdated,
  setNewDepartmentUpdated,
  setNewDesignationUpdated,

  handleEmployeeUpdate,

  mobile,
  newMobileUpdated,
  setNewMobileUpdated,
  newMobile,
  setNewMobile,

  email,
  newEmailUpdated,
  setNewEmailUpdated,
  newEmail,
  setNewEmail,

  newDegreeUpdated,
  setNewDegreeUpdated,
  newDegree,
  setNewDegree,
}) => {
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
                !newFirstnameUpdated
                  ? firstname + " " + lastname
                  : newFirstnameUpdated
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

        {/* *******************************DEGREE */}
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Degree</Form.Label>
          <div className="form-control-container ">
            <Form.Control
              className="form-control-container-input"
              defaultValue={!newDegreeUpdated ? newDegree : degree}
              type="text"
              autoFocus
              onChange={(e) => {
                setNewDegreeUpdated(true);
                setNewDegree(e.target.value);
              }}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-user"></i>
            </span>
          </div>
        </Form.Group>

        {/* *******************************DEPARTMENT */}
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
                !newDepartmentUpdated
                  ? department
                  : newDepartmentUpdated
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
              defaultValue={
                !newDesignationUpdated
                  ? designation
                  : newDesignationUpdated
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
              defaultValue={
                !newMobileUpdated
                  ? mobile
                  : newMobileUpdated
                  ? newMobile
                  : mobile
              }
              type="text"
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
              defaultValue={
                !newEmailUpdated ? email : newEmailUpdated ? newEmail : email
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
            setEditMode(!editMode);
            handleEmployeeUpdate(e, employeeid);
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
