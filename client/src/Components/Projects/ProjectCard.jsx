import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { toSentenceCase } from "../../Helpers/strings";

const ProjectCard = ({
  setDeleteNotif,
  workStatusOptions,
  priorityOptions,
  handleShowNow,
  handleProjectSetForModal,
  handleEditMode,
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
  newDepartmentUpdated,
  newDescriptionUpdated,
  newTitleUpdated,
  newStatusUpdated,
  newPriorityUpdated,
  newTeamUpdated,
  handleDeleteProjectFromDB,
  onDelete,
}) => {
  const [btnValue, setBtnValue] = useState(0);
  const handleBtnValue = (id) => setBtnValue(id);

  // Titles
  const titles = ["Created", "Team Lead", "Priority", "Deadline", "Bug", "Team"];

  // UI State
  const [optionsIconDisplay, setOptionsIconDisplay] = useState(false);
  const [optionPanelDisplay, setOptionPanelDisplay] = useState(false);

  const handleOptionsIconEnter = () => setOptionsIconDisplay(true);
  const handleOptionsIconLeave = () => setOptionsIconDisplay(false);
  const handleOptionPanelDisplay = () => setOptionPanelDisplay(!optionPanelDisplay);

  const handleProjectDelete = (projectID) => {
    handleDeleteProjectFromDB(projectID);
    onDelete(projectID);
    // show delete for 3 secs
    setTimeout(() => {
      setDeleteNotif(false);
    }, 3000);
  };

  const startDateReformat = () => {
    if (startDate) {
      let newStartDate = startDate.substring(0, 10);
      return newStartDate;
    } else return null;
  };

  const endDateReformat = () => {
    if (endDate) {
      let newEndDate = endDate.substring(0, 10);
      return newEndDate;
    } else return null;
  };

  const newStartDate = startDateReformat();
  const newEndDate = endDateReformat();

  return (
    <section
      className="project-card"
      onMouseEnter={handleOptionsIconEnter}
      onMouseLeave={handleOptionsIconLeave}
      onClick={handleOptionPanelDisplay}
    >
      <div className="options">
        <i
          onClick={handleOptionPanelDisplay}
          className={optionsIconDisplay ? "fa-solid fa-ellipsis-vertical fs-5 options-icon options-icon_visible" : null}
        ></i>
        {/* ***Options Panel End */}
        {optionPanelDisplay ? (
          <div className="options-btns">
            <div
              className="options-btns-link"
              onClick={(e) => {
                handleOptionPanelDisplay();
                handleBtnValue(projectID);
                handleEditMode();
                handleShowNow(true);
                handleProjectSetForModal({
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
                  newDepartmentUpdated,
                  newPriorityUpdated,
                  newStatusUpdated,
                  newTeamUpdated,
                  newTitle,
                  newDepartment,
                  newDescription,
                  newPriority,
                  newStatus,
                  newTeam,
                });
              }}
            >
              <i
                type="button"
                className="fa-regular fa-pen-to-square fs-5 edit-btn"
              ></i>
              <p>Edit Project</p>
            </div>

            <div
              className="options-btns-link"
              onClick={() => {
                handleProjectDelete(projectID);
                setDeleteNotif(true);
              }}
            >
              <i className="fa-regular fa-trash-can fs-5"></i>
              <p>Delete Project</p>
            </div>
          </div>
        ) : null}
        {/* ***Options Panel End */}
      </div>

      <div className="project-card-header">
        <div className="project-card-header-left">
          <i className="fa-regular fa-circle-check"></i>
          <h3> {newTitleUpdated ? newTitle : title ? title : "N/A"} </h3>
        </div>
        {/* ******************************STATUS */}
        {workStatusOptions.map((option) => {
          if (status && status.includes(option)) {
            return (
              <p
                key={option}
                className={`project-card-header-status project-card-header-status_${option} info`}
              >
                {newStatusUpdated ? newStatus : status ? status : "N/A"}
              </p>
            );
          } else return;
        })}
      </div>

      <p className="description"> {newDescriptionUpdated ? newDescription : description ? description : "N/A"}</p>

      <Row>
        <Col lg="4">
          {titles.map((title) => {
            return (
              <p
                key={title}
                className="info"
              >
                {title}
              </p>
            );
          })}
        </Col>

        <Col lg="5">
          <p className="info calendar">
            <i className="fa-regular fa-calendar-days"></i> {newStartDate ? newStartDate : "None"}
          </p>
          <p className="info">{newTeamUpdated ? newTeam : team ? team : "None"}</p>

          <div className="priority">
            <span className="priority-icon">
              {priorityOptions.map((option) => {
                if (priority == option) {
                  return (
                    <div
                      key={option}
                      className={`priority-icon-${option}`}
                    >
                      <i
                        className={
                          priority == "high"
                            ? "fa-solid fa-angle-up "
                            : priority == "medium"
                            ? "fa-solid fa-greater-than "
                            : "fa-solid fa-angle-down"
                        }
                      ></i>
                      {newPriorityUpdated ? newPriority : toSentenceCase(priority) ? toSentenceCase(priority) : "None"}
                    </div>
                  );
                } else return;
              })}
            </span>
          </div>
          <p className="info calendar">
            <i className="fa-regular fa-calendar-days"></i> {newEndDate ? newEndDate : "None"}
          </p>
          <p className="info">Bug</p>
          <p className="info">
            {newDepartmentUpdated ? newDepartment : toSentenceCase(department) ? toSentenceCase(department) : "None"}
          </p>
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
              ? "45%"
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
            ></span>
          </span>
        </div>
      </div>
    </section>
  );
};
export default ProjectCard;
