import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";

const ProjectModal = ({
  projectInfoForModal,
  handleEditMode,
  handleShowNow,
  projectID,
  title,
  department,
  priority,
  team,
  status,
  description,
  handleProjectUpdate,
}) => {
  // RADIOS
  const workStatusOptions = ["Active", "completed", "running", "pending", "not started", "canceled"];
  const priorityOptions = ["High", "Medium", "Low"];
  const teamOptions = ["Sarah", "Michelle", "Kelly"];
  const departmentOptions = ["development", "designing", "testing", "hr"];

  // Updated Inputs
  const [formUpdatedStatus, setFormUpdatedStatus] = useState({
    newTitleUpdated: false,
    newDepartmentUpdated: false,
    newPriorityUpdated: false,
    newStatusUpdated: false,
    newTeamUpdated: false,
    newDescriptionUpdated: false,
  });

  const handleFormUpdatedStatus = (key, value) => {
    setFormUpdatedStatus({ ...formUpdatedStatus, [key]: value });
  };

  // SET NEW FORM
  const [formData, setFormData] = useState({
    newTitle: "",
    newDepartment: "",
    newPriority: "",
    newStatus: "",
    newTeam: "",
    newDescription: "",
  });

  const handleFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // UPDATED PROJECT INFO
  const [projectToUpdate, setProjectToUpdate] = useState(projectInfoForModal);

  const handleProjectToUpdate = (values) => setProjectToUpdate(values);

  return (
    <section className="my-modal">
      <Form className="my-modal-form">
        {/* *******************************NAME */}
        <Form.Group className="mb-3">
          <Form.Label>Project Title</Form.Label>
          <div className="form-control-container ">
            <Form.Control
              className="form-control-container-input"
              defaultValue={formUpdatedStatus.newTitleUpdated ? formData.newTitle : title}
              type="text"
              autoFocus
              onChange={(e) => {
                handleFormUpdatedStatus("newTitleUpdated", true);
                handleFormData("newTitle", e.target.value);
                console.log(formUpdatedStatus.newTitleUpdated);
                handleProjectToUpdate({
                  ...projectInfoForModal,
                  title: e.target.value,
                });
              }}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-user"></i>
            </span>
          </div>
        </Form.Group>

        {/* *******************************Description */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Description</Form.Label>
          <div className="form-control-container ">
            <textarea
              className="form-control-container-input"
              onChange={(e) => {
                handleFormUpdatedStatus("newDescriptionUpdated", true);
                handleFormData("newDescription", e.target.value);
                console.log(formData.newDescription);
                handleProjectToUpdate({ ...projectInfoForModal, description: e.target.value });
              }}
              type="text"
              id="description"
              defaultValue={formUpdatedStatus.newDescriptionUpdated ? formData.newDescription : description}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-user"></i>
            </span>
          </div>
        </Form.Group>

        {/* *******************************Team */}
        <fieldset>
          <label htmlFor="select department">Select Department</label>
          <select
            name="select department"
            id="select department"
            placeholder="Select Department"
            onChange={(e) => {
              handleFormUpdatedStatus("newDepartmentUpdated", true);
              handleFormData("newDepartment", e.target.value);
              console.log(formData.newDepartment);
              handleProjectToUpdate({ ...projectInfoForModal, department: e.target.value });
            }}
            required
            defaultValue={formUpdatedStatus.newDepartmentUpdated ? formData.newDepartment : department}
          >
            {departmentOptions.map((option) => {
              return (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              );
            })}
          </select>
        </fieldset>

        {/* *******************************Team Leader */}
        <Form.Label htmlFor="Team">Team</Form.Label>
        <select
          onChange={(e) => {
            handleFormUpdatedStatus("newTeamUpdated", true);
            handleFormData("newTeam", e.target.value);
            console.log(formData.newTeam);
            handleProjectToUpdate({ ...projectInfoForModal, team: e.target.value });
          }}
          name="Team"
          id="Team"
          placeholder="Team"
          required
          defaultValue="null"
        >
          {formUpdatedStatus.newTeamUpdated ? formData.newTeam : team}
          {teamOptions.map((option) => {
            return (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            );
          })}
        </select>

        {/* *******************************Priority */}
        <fieldset>
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            id="priority"
            placeholder="priority"
            onChange={(e) => {
              handleFormUpdatedStatus("newPriorityUpdated", true);
              handleFormData("newPriority", e.target.value);
              console.log(formData.newPriority);
              handleProjectToUpdate({ ...projectInfoForModal, priority: e.target.value });
            }}
            required
            className="form-control-container-input"
            defaultValue={formUpdatedStatus.newPriorityUpdated ? formData.newPriority : priority}
          >
            {priorityOptions.map((option) => {
              return (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              );
            })}
          </select>
        </fieldset>

        {/* *******************************WORK Status */}
        <fieldset className="work-status">
          <p>Work Status</p>
          {workStatusOptions.map((option) => {
            return (
              <React.Fragment key={option}>
                <input
                  className="radio"
                  type="radio"
                  name="status"
                  value={option}
                  onChange={(e) => {
                    handleFormUpdatedStatus("newStatusUpdated", true);
                    handleFormData("newStatus", e.target.value);
                    console.log(formData.newStatus);
                    handleProjectToUpdate({ ...projectInfoForModal, status: e.target.value });
                  }}
                />
                <Form.Label htmlFor={option}>{option} </Form.Label>
              </React.Fragment>
            );
          })}
        </fieldset>

        <Button
          className="close-btn"
          variant="secondary"
          onClick={() => {
            handleShowNow(false);
          }}
        >
          Close
        </Button>
        <Button
          className="update-btn"
          variant="primary"
          onClick={(e) => {
            handleEditMode();
            handleProjectUpdate(e, projectID, projectToUpdate);
            handleShowNow(false);
          }}
        >
          Save Changes
        </Button>
      </Form>
    </section>
  );
};

export default ProjectModal;
