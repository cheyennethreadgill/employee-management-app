import { Row, Container, Col } from "react-bootstrap";
import { useState } from "react";
import ProjectModal from "../Global/ProjectModal";

const ProjectCard = ({
  URL,
  projectID,
  title,
  department,
  priority,
  client,
  price,
  startDate,
  endDate,
  team,
  status,
  description,
}) => {
  const [btnValue, setBtnValue] = useState(0);
  const [showNow, setShowNow] = useState(false);
  const handleBtnValue = (id) => setBtnValue(id);
  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => setEditMode(!editMode);
  const [optionsIconDisplay, setOptionsIconDisplay] = useState(false);
  const [optionPanelDisplay, setOptionPanelDisplay] = useState(false);

  // UpdatedInputs
  const [newTitleUpdated, setnewTitleUpdated] = useState(false);
  const [newDepartmentUpdated, setnewDepartmentUpdated] = useState(false);
  const [newPriorityUpdated, setnewPriorityUpdated] = useState(false);
  const [newStatusUpdated, setnewStatusUpdated] = useState(false);
  const [newTeamUpdated, setnewTeamUpdated] = useState(false);

  // SET NEW FORM
  const [newTitle, setnewTitle] = useState("");
  const [newDepartment, setnewDepartment] = useState("");
  const [newPriority, setnewPriority] = useState("");
  const [newStatus, setnewStatus] = useState("");
  const [newTeam, setnewTeam] = useState("");

  const handleOptionPanelDisplay = (value) => setOptionPanelDisplay(value);

  const handleOptionsDisplayEnter = () => {
    setOptionsIconDisplay(true);
  };
  const handleOptionsIconDisplayLeave = () => {
    setOptionsIconDisplay(false);
  };
  const startDateReformat = () => {
    let newStartDate = startDate.substring(0, 10);
    return newStartDate;
  };
  const endDateReformat = () => {
    let newEndDate = endDate.substring(0, 10);
    return newEndDate;
  };
  const newStartDate = startDateReformat();
  const newEndDate = endDateReformat();

  return (
    <section
      className="project-card"
      onMouseEnter={handleOptionsDisplayEnter}
      onClick={() => handleOptionPanelDisplay(true)}
    >
      <div className="options">
        <i
          onClick={() => {
            handleOptionPanelDisplay();
          }}
          class={
            optionsIconDisplay
              ? "fa-solid fa-ellipsis-vertical fs-5 options-icon"
              : null
          }
        ></i>
        {optionPanelDisplay ? (
          <div className="options-btns">
            <div className="options-btns-link">
              {" "}
              <i
                onClick={() => {
                  handleBtnValue(projectID);
                  handleEditMode();
                  handleShowNow(true);
                }}
                type="button"
                className="fa-regular fa-pen-to-square fs-5 edit-btn"
              >
                {" "}
              </i>
              <p>Edit Project</p>
            </div>

            <div className="options-btns-link">
              <i class="fa-regular fa-trash-can fs-5"></i>
              <p>Delete Project</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="project-card-header">
        <div className="project-card-header-left">
          <i className="fa-regular fa-circle-check"></i>
          <h3> {title} </h3>
        </div>
        {status == "active" ? (
          <p className="project-card-header-status project-card-header-status_active info">
            {" "}
            {status}{" "}
          </p>
        ) : status == "running" ? (
          <p className="project-card-header-status project-card-header-status_running info">
            {" "}
            {status}{" "}
          </p>
        ) : status == "completed" ? (
          <p className="project-card-header-status project-card-header-status_completed info">
            {" "}
            {status}{" "}
          </p>
        ) : status == "pending" ? (
          <p className="project-card-header-status project-card-header-status_pending info">
            {" "}
            {status}{" "}
          </p>
        ) : status == "not-started" ? (
          <p className="project-card-header-status project-card-header-status_not info-started">
            {" "}
            {status}{" "}
          </p>
        ) : (
          <p className="project-card-header-status project-card-header-status_canceled info">
            {" "}
            {status}{" "}
          </p>
        )}
      </div>
      <p className="description"> {description} </p>

      <Row>
        <Col lg="4">
          <p className="info">Created</p>
          <p className="info">Team Lead</p>
          <p className="info">Priority</p>
          <p className="info">Dealine</p>

          <p className="info">Bug</p>
          <p className="info">Team</p>
        </Col>
        <Col lg="5">
          <p className="info calendar">
            <i className="fa-regular fa-calendar-days"></i>{" "}
            {newStartDate ? newStartDate : "None"}{" "}
          </p>
          <p className="info">{team ? team : "None"}</p>
          <p className="priority">
            {" "}
            <span className="priority-icon">
              {" "}
              {priority === "high" ? (
                <div className="priority-icon-high">
                  <i className="fa-solid fa-angle-up "></i>
                  {priority ? priority : "None"}{" "}
                </div>
              ) : priority === "medium" ? (
                <div className="priority-icon-medium">
                  <i className="fa-solid fa-greater-than "></i>
                  {priority ? priority : "None"}{" "}
                </div>
              ) : (
                <div className="priority-icon-low">
                  <i className="fa-solid fa-angle-down "></i>
                  {priority ? priority : "None"}{" "}
                </div>
              )}{" "}
            </span>{" "}
          </p>
          <p className="info calendar">
            <i className="fa-regular fa-calendar-days"></i>{" "}
            {newEndDate ? newEndDate : "None"}{" "}
          </p>
          <p className="info">Bug</p>
          <p className="info">{department ? department : "None"}</p>
        </Col>
      </Row>

      <div className="progress-container">
        <div className="progress-header">
          <p>Progress</p>
          <p>
            {status == "active"
              ? "15%"
              : status == "completed"
              ? "100%"
              : status == "running"
              ? "25%"
              : status == "pending"
              ? "0%"
              : status == "not-started"
              ? "0%"
              : status == "canceled"
              ? "0%"
              : "N/A"}
          </p>
        </div>
        <div className="progress-bar">
          <span className="progress-bar-inner progress-bar">
            <span
              className={
                status == "active"
                  ? "progress-bar-inner_active progress-bar-inner-bar"
                  : status == "completed"
                  ? "progress-bar-inner_completed progress-bar-inner-bar"
                  : status == "running"
                  ? "progress-bar-inner_running progress-bar-inner-bar"
                  : status == "pending"
                  ? "progress-bar-inner_pending progress-bar-inner-bar"
                  : status == "not-started"
                  ? "progress-bar-inner_not-started progress-bar-inner-bar"
                  : status == "canceled"
                  ? "progress-bar-inner_canceled progress-bar-inner-bar"
                  : null
              }
            >
              {" "}
            </span>{" "}
          </span>
        </div>
      </div>

      {/* ***************************************************SHOW MODAL */}
      {!showNow ? null : (
        <ProjectModal
          handleShowNow={handleShowNow}
          handleEditMode={handleEditMode}
          projectID={projectID}
          title={title}
          department={department}
          priority={priority}
          team={team}
          status={status}
          newTitle={newTitle}
          setnewTitle={setnewTitle}
          newDepartment={newDepartment}
          setnewDepartment={setnewDepartment}
          newPriority={newPriority}
          setnewPriority={setnewPriority}
          newStatus={newStatus}
          setnewStatus={setnewStatus}
          newTeam={newTeam}
          setnewTeam={setnewTeam}
          newTitleUpdated={newTitleUpdated}
          setnewTitleUpdated={setnewTitleUpdated}
          newDepartmentUpdated={newDepartmentUpdated}
          setnewDepartmentUpdated={setnewDepartmentUpdated}
          newPriorityUpdated={newPriorityUpdated}
          setnewPriorityUpdated={setnewPriorityUpdated}
          newStatusUpdated={newStatusUpdated}
          setnewStatusUpdated={setnewStatusUpdated}
          newTeamUpdated={newTeamUpdated}
          setnewTeamUpdated={setnewTeamUpdated}
          handleProjectUpdate={handleProjectUpdate}
        />
      )}
    </section>
  );
};
export default ProjectCard;
