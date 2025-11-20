import React from "react";
import ProjectModal from "../Global/ProjectModal";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toSentenceCase } from "../../Helpers/strings";
import { CustomContext } from "../../index";

const DashSingleProject = ({ URL, handleEditMode, projectID, title, department, priority, team, status }) => {
  const { ALLPROJECTS_PATH, workStatusOptions, priorityOptions, teamOptions, departmentOptions } =
    useContext(CustomContext);
  const UPDATE_PATH = "update-project";
  const [btnValue, setBtnValue] = useState(0);
  const [showNow, setShowNow] = useState(false);

  // const handleBtnValue = (id) => setBtnValue(id);
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
  async function handleProjectUpdate(e: React.FormEvent, id: number) {
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
      const fetchPromiseResponse = await fetch(`${URL}${UPDATE_PATH}`, options);
      if (!fetchPromiseResponse.ok) {
        console.log(`Something went wrong with fetch from server ${fetchPromiseResponse.status}`);
      }
      const jsonPromiseResponse = fetchPromiseResponse.json();

      jsonPromiseResponse.then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.log(`Dash Single Project fetch error: ${err}`);
      console.log(`FETCH FAILED: ${err}`);
    }
  }

  return (
    <React.Fragment>
      {/* // <Link
    //   to="all-projects"
    //   className="dash-projects-card-project"
    // > */}
      <div className="dash-projects-card-project-entry">
        <div className="overflow-hidden">
          <p> {newTitleUpdated ? newTitle : toSentenceCase(title) ? toSentenceCase(title) : "N/A"} </p>
        </div>
        <div className="overflow-hidden">
          <p>
            {newDepartmentUpdated ? newDepartment : toSentenceCase(department) ? toSentenceCase(department) : "N/A"}
          </p>
        </div>
        <div className="overflow-hidden">
          <p> {newTeamUpdated ? newTeam : toSentenceCase(team) ? toSentenceCase(team) : "N/A"} </p>
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
                : "N/A"
            }
          >
            {newPriorityUpdated ? newPriority : priority ? priority : "N/A"}
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
          <p> Docs </p>
        </div>
        {/* <div className="form-btns employee-card-desktop-form-fields overflow-hidden">
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
        </div> */}
      </div>
      <hr />
      {/* ***************************************************SHOW MODAL */}

      {!showNow ? null : (
        <ProjectModal
          workStatusOptions={workStatusOptions}
          priorityOptions={priorityOptions}
          teamOptions={teamOptions}
          handleShowNow={handleShowNow}
          handleEditMode={handleEditMode}
          projectID={projectID}
          title={title}
          department={department}
          priority={priority}
          team={team}
          handleProjectUpdate={handleProjectUpdate}
          description={""}
          departmentOptions={""}
          projectInfoForModal={{}}
        />
      )}
      {/* </Link> */}
    </React.Fragment>
  );
};

export default DashSingleProject;
