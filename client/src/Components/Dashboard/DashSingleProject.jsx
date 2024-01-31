import ProjectModal from "../Global/ProjectModal";
import { useState, useEffect } from "react";

const DashSingleProject = ({
  employeeTeam,
  URL,
  handleEditMode,
  projectID,
  title,
  department,
  priority,
  team,
  status,
}) => {
  const [btnValue, setBtnValue] = useState(0);
  const [showNow, setShowNow] = useState(false);

  const handleBtnValue = (id) => setBtnValue(id);
  const handleShowNow = () => setShowNow(!showNow);

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

  //   UPDATE PROJECT
  async function handleProjectUpdate(e, id) {
    e.preventDefault();

    // Post options
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectID: id,
        title: `${newTitleUpdated ? newTitle : title}`,
        department: `${newDepartmentUpdated ? newDepartment : department}`,
        priority: `${newPriorityUpdated ? newPriority : priority}`,
        status: `${newStatusUpdated ? newStatus : status}`,
        team: `${newTeamUpdated ? newTeam : team}`,
      }),
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}update-project`, options);
      if (!fetchPromiseResponse.ok) {
        console.log(
          `Something went wrong with fetch from server ${fetchPromiseResponse.status}`
        );
      }
      const jsonPromiseResponse = fetchPromiseResponse.json();

      jsonPromiseResponse.then((res) => {
        console.log(res);
      });
    } catch {
      (err) => {
        console.log(`FETCH FAILED: ${err}`);
      };
    }
  }

  return (
    <div className="dash-projects-card-project">
      <div className="dash-projects-card-project-entry">
        <div className="overflow-hidden">
          <p> {newTitleUpdated ? newTitle : title} </p>
        </div>
        <div className="overflow-hidden">
          <p> {newDepartmentUpdated ? newDepartment : department} </p>
        </div>
        <div className="overflow-hidden">
          <p> {newTeamUpdated ? newTeam : team} </p>
        </div>
        <div className="overflow-hidden">
          <p
            className={
              priority == "high"
                ? "priority priority-high"
                : priority == "medium"
                ? "priority priority-medium"
                : priority == "low"
                ? "priority priority-low"
                : null
            }
          >
            {newPriorityUpdated ? newPriority : priority}
          </p>
        </div>
        <div className="overflow-hidden">
          <p> 19 </p>
        </div>
        <div className="overflow-hidden">
          <p> 12 </p>
        </div>
        <div className="overflow-hidden">
          <p className="status-bar">
            {" "}
            <span className="status-bar-inner status-bar">
              <span
                className={
                  status == "active"
                    ? "status-bar-inner_active"
                    : status == "completed"
                    ? "status-bar-inner_completed"
                    : status == "running"
                    ? "status-bar-inner_running"
                    : status == "pending"
                    ? "status-bar-inner_pending"
                    : status == "not-started"
                    ? "status-bar-inner_not-started"
                    : status == "canceled"
                    ? "status-bar-inner_canceled"
                    : null
                }
              ></span>
            </span>
          </p>
        </div>
        <div className="overflow-hidden">
          <p> docs </p>
        </div>
        <div className="form-btns employee-card-desktop-form-fields overflow-hidden">
          <i
            onClick={(e) => {
              handleBtnValue(projectID);
              handleEditMode();
              handleShowNow(true);
              //   console.log(department);
            }}
            type="button"
            className="fa-regular fa-pen-to-square fs-5 edit-btn"
          ></i>
          <i
            onClick={() => {
              onDelete(employeeid);
              onUpdateEmployeeState(employeeid);
            }}
            type="submit"
            className="fa-regular fa-trash-can delete-btn"
          ></i>
        </div>
      </div>
      <hr />

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
    </div>
  );
};

export default DashSingleProject;
