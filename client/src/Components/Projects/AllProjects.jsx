import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";
import ProjectModal from "../Global/ProjectModal";

const AllProjects = ({
  URL,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchErrorworkStatusOptions,
  workStatusOptions,
  priorityOptions,
  teamOptions,
  departmentOptions,
}) => {
  const PATH = "projects";
  const UPDATE_PATH = "update-project";
  const [projects, setProjects] = useState([]);

  // get Project
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setProjects(json));
    handleLoadingState(false);
  }, []);

  const [loading, setLoading] = useState(true);
  const [showNow, setShowNow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteNotif, setDeleteNotif] = useState(false);
  const [projectInfoForModal, setprojectInfoForModal] = useState({});

  const handleLoadingState = (value) => setLoading(value);
  const handleShowNow = () => setShowNow(!showNow);
  const handleEditMode = () => setEditMode(!editMode);
  // Set project info given by employee card
  const handleProjectSet = (values) => setprojectInfoForModal(values);

  // Deleted Notification
  function DeleteNotification() {
    return (
      <div
        className={deleteNotif ? "project-card_delete-notification_show" : "project-card_delete-notification_remove"}
      >
        <p>Project deleted!</p>
      </div>
    );
  }

  // // UPDATE PROJECT STATE DELETE (UI)
  const handleProjectStateUpdateDelete = (id) => {
    setProjects(
      projects.filter((project) => {
        return project.projectID !== id;
      })
    );
  };

  // UPDATE Project STATE (UI)
  const handleProjectStateUpdate = (id, projectToUpdate) => {
    setProjects(
      projects.map((project) => {
        if (project.projectID === id) {
          return { ...projectToUpdate };
        } else {
          return { ...project };
        }
      })
    );
  };

  //   UPDATE PROJECT (DB)
  async function handleProjectUpdate(e, id, projectToUpdate) {
    e.preventDefault();
    handleProjectStateUpdate(id, projectToUpdate);

    // Post options
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectID: id,
        title: `${projectToUpdate.newTitleUpdated ? projectToUpdate.newTitle : projectToUpdate.title}`,
        department: `${
          projectToUpdate.newDepartmentUpdated ? projectToUpdate.newDepartment : projectToUpdate.department
        }`,
        priority: `${projectToUpdate.newPriorityUpdated ? projectToUpdate.newPriority : projectToUpdate.priority}`,
        status: `${projectToUpdate.newStatusUpdated ? projectToUpdate.newStatus : projectToUpdate.status}`,
        team: `${projectToUpdate.newTeamUpdated ? projectToUpdate.newTeam : projectToUpdate.team}`,
        description: `${
          projectToUpdate.newDescriptionUpdated ? projectToUpdate.newDescription : projectToUpdate.description
        }`,
      }),
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}${UPDATE_PATH}`, options);
      handleFetchPromiseError(fetchPromiseResponse);
      const jsonPromiseResponse = fetchPromiseResponse.json();
      handleJsonPromiseResponseLog(jsonPromiseResponse);
    } catch {
      (err) => handleFetchError(err);
    }
  }

  // DELETE EMPLOYEE From DB
  async function deleteProjectFromDB(id) {
    // Post options
    const options = {
      method: "DELETE",
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}delete-project/${id}`, options);
      handleFetchPromiseError(fetchPromiseResponse);
      const jsonPromiseResponse = fetchPromiseResponse.json();
      handleJsonPromiseResponseLog(jsonPromiseResponse);
    } catch {
      (err) => handleFetchError(err);
    }
  }

  return (
    <section className="all-projects">
      <Container>
        <PageHeaders name={PATH} />
        <section className="project">
          <div className="project-header-main">
            <h2>New Projects</h2>
            <p>{projects.length} projects</p>
          </div>
          {loading && <div className="loading"></div>}
          {!loading && (
            <Row className="all-projects-row">
              {projects.map((project) => {
                const {
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
                } = project;

                return (
                  <Col
                    className="project-col"
                    key={projectID}
                    lg="3"
                    md="1"
                  >
                    <ProjectCard
                      DeleteNotification={DeleteNotification}
                      setDeleteNotif={setDeleteNotif}
                      workStatusOptions={workStatusOptions}
                      priorityOptions={priorityOptions}
                      teamOptions={teamOptions}
                      departmentOptions={departmentOptions}
                      URL={URL}
                      handleProjectSet={handleProjectSet}
                      onDelete={handleProjectStateUpdateDelete}
                      showNow={showNow}
                      handleShowNow={handleShowNow}
                      editMode={editMode}
                      handleEditMode={handleEditMode}
                      projectID={projectID}
                      title={title}
                      department={department}
                      priority={priority}
                      client={client}
                      price={price}
                      startDate={startDate}
                      endDate={endDate}
                      team={team}
                      status={status}
                      description={description}
                      newTitle={projectInfoForModal.newTitle}
                      newDescription={projectInfoForModal.newDescription}
                      newDepartment={projectInfoForModal.newDepartment}
                      newPriority={projectInfoForModal.newPriority}
                      newStatus={projectInfoForModal.newStatus}
                      newTeam={projectInfoForModal.newTeam}
                      newTitleUpdated={projectInfoForModal.newTitleUpdated}
                      newDepartmentUpdated={projectInfoForModal.newDepartmentUpdated}
                      newPriorityUpdated={projectInfoForModal.newPriorityUpdated}
                      newStatusUpdated={projectInfoForModal.newStatusUpdated}
                      newTeamUpdated={projectInfoForModal.newTeamUpdated}
                      newDescriptionUpdated={projectInfoForModal.newDescriptionUpdated}
                      handleProjectUpdate={handleProjectUpdate}
                      deleteProjectFromDB={deleteProjectFromDB}
                    />
                  </Col>
                );
              })}
            </Row>
          )}
        </section>
      </Container>
      {/* ***************************************************SHOW MODAL */}
      {!showNow ? null : (
        <ProjectModal
          workStatusOptions={workStatusOptions}
          priorityOptions={priorityOptions}
          teamOptions={teamOptions}
          departmentOptions={departmentOptions}
          projects={projects}
          setProjects={setProjects}
          projectInfoForModal={projectInfoForModal}
          handleShowNow={handleShowNow}
          handleEditMode={handleEditMode}
          projectID={projectInfoForModal.projectID}
          title={projectInfoForModal.title}
          department={projectInfoForModal.department}
          priority={projectInfoForModal.priority}
          team={projectInfoForModal.team}
          status={projectInfoForModal.status}
          description={projectInfoForModal.description}
          handleProjectUpdate={handleProjectUpdate}
        />
      )}
      {deleteNotif && <DeleteNotification />}
    </section>
  );
};

export default AllProjects;
