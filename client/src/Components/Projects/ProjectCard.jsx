import { Row, Container, Col } from "react-bootstrap";
import { useState } from "react";
import ProjectModal from "../Global/ProjectModal";

const ProjectCard = ({
  projectInfoForModal,
  URL,
  showNow,
  handleShowNow,
  handleProjectSet,
  handleEditMode,
  editMode,
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
  newTitle,
  newDepartment,
  newPriority,
  newStatus,
  newTeam,
  newDescription,
  setnewTitle,
  setnewDepartment,
  setnewPriority,
  setnewStatus,
  setnewTeam,
  setnewDescription,
  newDepartmentUpdated,
  newDescriptionUpdated,
  setnewTitleUpdated,
  setnewDepartmentUpdated,
  setnewDescriptionUpdated,
  setnewPriorityUpdated,
  setnewTeamUpdated,
  setnewStatusUpdated,
  newTitleUpdated,
  newStatusUpdated,
  newPriorityUpdated,
  newTeamUpdated,
  handleProjectUpdate,
}) => {
  const PATH = "update-project";
  const [btnValue, setBtnValue] = useState(0);

  const handleBtnValue = (id) => setBtnValue(id);

  // // UpdatedInputs
  // const [newTitleUpdated, setnewTitleUpdated] = useState(false);
  // const [newDepartmentUpdated, setnewDepartmentUpdated] = useState(false);
  // const [newPriorityUpdated, setnewPriorityUpdated] = useState(false);
  // const [newStatusUpdated, setnewStatusUpdated] = useState(false);
  // const [newTeamUpdated, setnewTeamUpdated] = useState(false);

  // // SET NEW FORM
  // const [newTitle, setnewTitle] = useState("");
  // const [newDepartment, setnewDepartment] = useState("");
  // const [newPriority, setnewPriority] = useState("");
  // const [newStatus, setnewStatus] = useState("");
  // const [newTeam, setnewTeam] = useState("");

  // UI State
  const [optionsIconDisplay, setOptionsIconDisplay] = useState(false);
  const [optionPanelDisplay, setOptionPanelDisplay] = useState(false);

  const handleOptionsIconEnter = () => setOptionsIconDisplay(true);
  const handleOptionsIconLeave = () => setOptionsIconDisplay(false);
  const handleOptionPanelDisplay = () => setOptionPanelDisplay(!optionPanelDisplay);

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
      onMouseEnter={handleOptionsIconEnter}
      onMouseLeave={handleOptionsIconLeave}
    >
      <div className="options">
        <i
          onClick={handleOptionPanelDisplay}
          className={optionsIconDisplay ? "fa-solid fa-ellipsis-vertical fs-5 options-icon options-icon_visible" : null}
        ></i>
        {optionPanelDisplay ? (
          <div className="options-btns">
            <div
              className="options-btns-link"
              onClick={(e) => {
                handleOptionPanelDisplay();
                handleBtnValue(projectID);
                handleEditMode();
                handleShowNow(true);
                handleProjectSet({
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
                  newTitleUpdated,
                  newDescriptionUpdated,
                  setnewTitleUpdated,
                  setnewDescriptionUpdated,
                  newDepartmentUpdated,
                  setnewDepartmentUpdated,
                  newPriorityUpdated,
                  setnewPriorityUpdated,
                  newStatusUpdated,
                  setnewStatusUpdated,
                  newTeamUpdated,
                  setnewTeamUpdated,
                  newTitle,
                  setnewTitle,
                  newDepartment,
                  setnewDepartment,
                  newDescription,
                  newPriority,
                  setnewPriority,
                  newStatus,
                  setnewStatus,
                  newTeam,
                  setnewTeam,
                });
              }}
            >
              <i
                type="button"
                className="fa-regular fa-pen-to-square fs-5 edit-btn"
              ></i>
              <p>Edit Project</p>
            </div>

            <div className="options-btns-link">
              <i className="fa-regular fa-trash-can fs-5"></i>
              <p>Delete Project</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="project-card-header">
        <div className="project-card-header-left">
          <i className="fa-regular fa-circle-check"></i>
          <h3> {newTitleUpdated ? newTitle : title} </h3>
        </div>
        {status == "active" ? (
          <p className="project-card-header-status project-card-header-status_active info"> {status} </p>
        ) : status == "running" ? (
          <p className="project-card-header-status project-card-header-status_running info"> {status} </p>
        ) : status == "completed" ? (
          <p className="project-card-header-status project-card-header-status_completed info"> {status} </p>
        ) : status == "pending" ? (
          <p className="project-card-header-status project-card-header-status_pending info"> {status} </p>
        ) : status == "not-started" ? (
          <p className="project-card-header-status project-card-header-status_not info-started"> {status} </p>
        ) : (
          <p className="project-card-header-status project-card-header-status_canceled info"> {status} </p>
        )}
      </div>
      <p className="description">
        {" "}
        {!description ? "N/A" : description ? description : newDescriptionUpdated ? newDescription : null}{" "}
      </p>

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
            <i className="fa-regular fa-calendar-days"></i> {newStartDate ? newStartDate : "None"}{" "}
          </p>
          <p className="info">{newTeamUpdated ? newTeam : team ? team : "None"}</p>
          <div className="priority">
            <span className="priority-icon">
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
          </div>
          <p className="info calendar">
            <i className="fa-regular fa-calendar-days"></i> {newEndDate ? newEndDate : "None"}{" "}
          </p>
          <p className="info">Bug</p>
          <p className="info">{newDepartmentUpdated ? newDepartment : department ? department : "None"}</p>
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
            ></span>{" "}
          </span>
        </div>
      </div>

      {/* ***************************************************SHOW MODAL */}
      {/* {!showNow ? null : (
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
      )} */}
    </section>
  );
};
export default ProjectCard;
