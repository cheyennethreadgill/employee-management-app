import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import ProjectCard from "./ProjectCard";
import PageHeaders from "../Global/PageHeaders";
import ProjectModal from "../Global/ProjectModal";
import { DeleteNotification } from "../Global/Notifications";
import { CustomContext } from "../../index";
import { deleteProjectFromDB } from "../../Helpers/apiCalls";

const AllProjects = ({
  URL,
  projects,
  handleSetProjects,
  workStatusOptions,
  priorityOptions,
  teamOptions,
  departmentOptions,
  handleFetchError,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchErrorworkStatusOptions,
}) => {
  const { AllProjectsTitle, loading, handleLoadingState } = useContext(CustomContext);

  const UPDATE_PATH = "update-project";
  const DELETEPROJECT_PATH = "delete-project/";

  const [showNow, setShowNow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteNotif, setDeleteNotif] = useState(false);
  const [projectInfoForModal, setprojectInfoForModal] = useState({});

  const handleShowNow = () => setShowNow(!showNow);
  const handleEditMode = () => setEditMode(!editMode);
  const handleProjectSetForModal = (values) => setprojectInfoForModal(values); // Set project info given by employee card

  // // UPDATE PROJECT STATE DELETE (UI)
  const handleProjectStateUpdateDelete = (id) => {
    handleSetProjects(
      projects.filter((project) => {
        return project.projectID !== id;
      })
    );
  };

  // UPDATE Project STATE (UI)
  const handleProjectStateUpdate = (id, projectToUpdate) => {
    handleSetProjects(
      projects.map((project) => {
        if (project.projectID === id) {
          return { ...projectToUpdate };
        } else {
          return { ...project };
        }
      })
    );
  };

  const handleDeleteProjectFromDB = (id) =>
    deleteProjectFromDB(
      id,
      URL,
      DELETEPROJECT_PATH,
      handleFetchPromiseError,
      handleJsonPromiseResponseLog,
      handleFetchError
    );
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
      // handleFetchPromiseError(fetchPromiseResponse);
      const jsonPromiseResponse = fetchPromiseResponse.json();
      // handleJsonPromiseResponseLog(jsonPromiseResponse);
    } catch {
      (err) => handleFetchError(err);
    }
  }

  return (
    <section className="all-projects">
      <Container>
        <PageHeaders title={AllProjectsTitle} />
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
                      setDeleteNotif={setDeleteNotif}
                      workStatusOptions={workStatusOptions}
                      priorityOptions={priorityOptions}
                      teamOptions={teamOptions}
                      departmentOptions={departmentOptions}
                      URL={URL}
                      handleProjectSetForModal={handleProjectSetForModal}
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
                      handleDeleteProjectFromDB={handleDeleteProjectFromDB}
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
      {deleteNotif && (
        <DeleteNotification
          deleteNotif={deleteNotif}
          thingDeleted="Project"
        />
      )}
    </section>
  );
};

export default AllProjects;
