import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";

const ProjectModal = ({
  workStatusOptions,
  priorityOptions,
  teamOptions,
  departmentOptions,
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
  function SelectComponent({ updateStatus, originalEntryString, originalEntry, newEntry }) {
    return (
      <fieldset>
        <label htmlFor={originalEntryString}>Select {originalEntryString}</label>
        <select
          className="form-control-container-input"
          name={originalEntryString}
          id={originalEntryString}
          onChange={(e) => {
            handleFormUpdatedStatus(updateStatus, true);
            handleFormData(newEntry, e.target.value);
            handleProjectToUpdate({ ...projectToUpdate, [originalEntryString]: e.target.value });
          }}
          required
          defaultValue={formUpdatedStatus[updateStatus] ? formData[newEntry] : originalEntry}
        >
          {originalEntryString == "department" &&
            departmentOptions.map((option) => {
              return (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              );
            })}
          {originalEntryString == "team" &&
            teamOptions.map((option) => {
              return (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              );
            })}
          {originalEntryString == "priority" &&
            priorityOptions.map((option) => {
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
    );
  }

  // Updated Form Status
  const [formUpdatedStatus, setFormUpdatedStatus] = useState({
    newTitleUpdated: false,
    newDepartmentUpdated: false,
    newPriorityUpdated: false,
    newStatusUpdated: false,
    newTeamUpdated: false,
    newDescriptionUpdated: false,
  });

  // Handle Form Update Status
  const handleFormUpdatedStatus = (key, value) => {
    setFormUpdatedStatus({ ...formUpdatedStatus, [key]: value });
  };

  // Set Form Status
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
  const [projectToUpdate, setProjectToUpdate] = useState({
    title: projectInfoForModal.title,
    department: projectInfoForModal.department,
    priority: projectInfoForModal.priority,
    status: projectInfoForModal.status,
    team: projectInfoForModal.team,
    description: projectInfoForModal.description,
  });

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
                handleProjectToUpdate({
                  ...projectToUpdate,
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
                handleProjectToUpdate({ ...projectToUpdate, description: e.target.value });
              }}
              type="text"
              id="description"
              defaultValue={formUpdatedStatus.newDescriptionUpdated ? formData.newDescription : description}
            />
            <span className="form-control-container-icon_end">
              <i className="fa-regular fa-comment"></i>
            </span>
          </div>
        </Form.Group>

        {/* *******************************Team */}
        <SelectComponent
          updateStatus="newDepartmentUpdated"
          newEntry="newDepartment"
          originalEntryString="department"
          originalEntry={department}
        />

        {/* *******************************Team Leader */}
        <SelectComponent
          updateStatus="newTeamUpdated"
          newEntry="newTeam"
          originalEntryString="team"
          originalEntry={team}
        />

        {/* *******************************Priority */}
        <SelectComponent
          updateStatus="newPriorityUpdated"
          newEntry="newPriority"
          originalEntryString="priority"
          originalEntry={priority}
        />

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
                    handleProjectToUpdate({ ...projectToUpdate, status: e.target.value });
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
