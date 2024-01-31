import { Form, Button } from "react-bootstrap";

const ProjectModal = ({
  handleEditMode,
  handleShowNow,
  projectID,
  title,
  department,
  priority,
  team,
  status,
  newTitle,
  setnewTitle,
  newDepartment,
  setnewDepartment,
  newPriority,
  setnewPriority,
  newStatus,
  setnewStatus,
  newTeam,
  setnewTeam,
  newTitleUpdated,
  setnewTitleUpdated,
  newDepartmentUpdated,
  setnewDepartmentUpdated,
  newPriorityUpdated,
  setnewPriorityUpdated,
  newStatusUpdated,
  setnewStatusUpdated,
  newTeamUpdated,
  setnewTeamUpdated,
  handleProjectUpdate,
}) => {
  return (
    <section className="my-modal">
      <Form className="my-modal-form">
        {/* *******************************NAME */}
        <Form.Group className="mb-3">
          <Form.Label>Project Title</Form.Label>
          <div className="form-control-container ">
            <Form.Control
              className="form-control-container-input"
              defaultValue={title}
              type="text"
              autoFocus
              onChange={(e) => {
                setnewTitleUpdated(true);
                setnewTitle(e.target.value);
              }}
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
            }}
            required={true}
          >
            <option
              defaultValue={true}
              value="null"
            >
              Choose Option
            </option>
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
          }}
          name="Team"
          id="Team"
          placeholder="Team"
          required={true}
          def
        >
          <option
            defaultValue={true}
            value="null"
          >
            Choose Option
          </option>
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
            }}
            required={true}
            className="form-control-container-input"
          >
            <option
              defaultValue={true}
              value="null"
            >
              Choose Option
            </option>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
        </fieldset>

        {/* *******************************Status */}

        {/* ************************************************** */}
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
            }}
            value="canceled"
          />
          <Form.Label htmlFor="">canceled</Form.Label>
        </fieldset>

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
            handleProjectUpdate(e, projectID);
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
