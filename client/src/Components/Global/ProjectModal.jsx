import { Form, Button } from "react-bootstrap";
import { useState } from "react";

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
  projects,
  setProjects,
  // newTitle,
  // setnewTitle,
  // newDepartment,
  // setnewDepartment,
  // newPriority,
  // setnewPriority,
  // newStatus,
  // setnewStatus,
  // newTeam,
  // setnewTeam,
  // newTitleUpdated,
  // setnewTitleUpdated,
  // newDepartmentUpdated,
  // setnewDepartmentUpdated,
  // newPriorityUpdated,
  // setnewPriorityUpdated,
  // newStatusUpdated,
  // setnewStatusUpdated,
  // newTeamUpdated,
  // setnewTeamUpdated,
  handleProjectUpdate,
}) => {
  // UpdatedInputs
  const [newTitleUpdated, setnewTitleUpdated] = useState(false);
  const [newDepartmentUpdated, setnewDepartmentUpdated] = useState(false);
  const [newPriorityUpdated, setnewPriorityUpdated] = useState(false);
  const [newStatusUpdated, setnewStatusUpdated] = useState(false);
  const [newTeamUpdated, setnewTeamUpdated] = useState(false);
  const [newDescriptionUpdated, setnewDescriptionUpdated] = useState(false);

  // SET NEW FORM
  const [newTitle, setnewTitle] = useState("");
  const [newDepartment, setnewDepartment] = useState("");
  const [newPriority, setnewPriority] = useState("");
  const [newStatus, setnewStatus] = useState("");
  const [newTeam, setnewTeam] = useState("");
  const [newDescription, setnewDescription] = useState("");

  const [projectToUpdate, setProjectToUpdate] = useState({ projectInfoForModal });
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
              defaultValue={newTitleUpdated ? newTitle : title}
              type="text"
              autoFocus
              onChange={(e) => {
                setnewTitleUpdated(true);
                setnewTitle(e.target.value);
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
                setnewDescriptionUpdated(true);
                setnewDescription(e.target.value);
                handleProjectToUpdate({ ...projectInfoForModal, description: e.target.value });
              }}
              type="text"
              id="description"
              defaultValue={newDescriptionUpdated ? newDescription : description}
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
              setnewDepartmentUpdated(true);
              setnewDepartment(e.target.value);
              console.log(` New Department: ${e.target.value}`);
              handleProjectToUpdate({ ...projectInfoForModal, department: e.target.value });
            }}
            required
            defaultValue={newDepartmentUpdated ? newDepartment : department}
          >
            <option value="development">Development</option>
            <option value="designing">Designing</option>
            <option value="testing">Testing</option>
            <option value="hr">HR</option>
          </select>
        </fieldset>

        {/* *******************************Team Leader */}
        <Form.Label htmlFor="Team">Team</Form.Label>
        <select
          onChange={(e) => {
            setnewTeamUpdated(true);
            setnewTeam(e.target.value);
            handleProjectToUpdate({ ...projectInfoForModal, team: e.target.value });
            console.log(projectInfoForModal);
          }}
          name="Team"
          id="Team"
          placeholder="Team"
          required
          defaultValue="null"
        >
          {newTeamUpdated ? newTeam : team}
          <option value="sarah">Sarah</option>
          <option value="michelle">Michelle</option>
          <option value="kelly">Kelly</option>
        </select>

        {/* *******************************Priority */}
        <fieldset>
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            id="priority"
            placeholder="priority"
            onChange={(e) => {
              setnewPriorityUpdated(true);
              setnewPriority(e.target.value);
              handleProjectToUpdate({ ...projectInfoForModal, priority: e.target.value });
              console.log(projectInfoForModal);
            }}
            required
            className="form-control-container-input"
            defaultValue={newPriorityUpdated ? newPriority : priority}
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </fieldset>

        {/* *******************************Status */}
        <fieldset className="work-status">
          <p>Work Status</p>
          <input
            className="radio"
            type="radio"
            name="status"
            value="active"
            onClick={(e) => {
              setnewStatusUpdated(true);
              setnewStatus(e.target.value);
              handleProjectToUpdate({ ...projectInfoForModal, status: e.target.value });
              console.log(projectInfoForModal);
            }}
          />
          <Form.Label htmlFor="Active">Active </Form.Label>
          <input
            className="radio"
            type="radio"
            name="status"
            onClick={(e) => {
              setnewStatusUpdated(true);
              setnewStatus(e.target.value);
              handleProjectToUpdate({ ...projectInfoForModal, status: e.target.value });
              console.log(projectInfoForModal);
            }}
            value="completed"
          />
          <Form.Label htmlFor="completed">completed</Form.Label>
          <input
            className="radio"
            type="radio"
            name="status"
            onClick={(e) => {
              setnewStatusUpdated(true);
              setnewStatus(e.target.value);
              handleProjectToUpdate({ ...projectInfoForModal, status: e.target.value });
              console.log(projectInfoForModal);
            }}
            value="running"
          />
          <Form.Label htmlFor="">running</Form.Label>
          <input
            className="radio"
            type="radio"
            name="status"
            onClick={(e) => {
              setnewStatusUpdated(true);
              setnewStatus(e.target.value);
              handleProjectToUpdate({ ...projectInfoForModal, status: e.target.value });
              console.log(projectInfoForModal);
            }}
            value="pending"
          />
          <Form.Label htmlFor="">pending</Form.Label>
          <input
            className="radio"
            type="radio"
            name="status"
            onClick={(e) => {
              setnewStatusUpdated(true);
              setnewStatus(e.target.value);
              handleProjectToUpdate({ ...projectInfoForModal, status: e.target.value });
              console.log(projectInfoForModal);
            }}
            value="not started"
          />
          <Form.Label htmlFor="">not started</Form.Label>
          <input
            className="radio"
            type="radio"
            name="status"
            onClick={(e) => {
              setnewStatusUpdated(true);
              setnewStatus(e.target.value);
              handleProjectToUpdate({ ...projectInfoForModal, status: e.target.value });
              console.log(projectInfoForModal);
            }}
            value="canceled"
          />
          <Form.Label htmlFor="">canceled</Form.Label>
        </fieldset>

        <Button
          className="close-btn"
          variant="secondary"
          onClick={() => {
            handleShowNow(false);
            // console.log(projectInfoForModal);
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
            console.log(`Department Updated Status: ${newDepartmentUpdated}`);

            // setProjects([...holla, projectInfoForModal]);
            // **this is showing updates
          }}
        >
          Save Changes
        </Button>
      </Form>
    </section>
  );
};

export default ProjectModal;
