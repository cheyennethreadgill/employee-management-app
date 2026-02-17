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
  setDeleteNotif,
  deleteNotif,
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
  type ProjectsMapInterface = {
    projectID: number;
    title: string;
    department: string;
    priority: string;
    client: string;
    price: number;
    startDate: string;
    endDate: string;
    team: string;
    status: boolean;
    description: string;
  };
  type ProjectInterface = {
    projectID: number;
    title: string;
    department: string;
    priority: string;
    team: string;
    status: boolean;
    description: string;
    newTitle: string;
    newDescription: string;
    newDepartment: string;
    newPriority: string;
    newStatus: string;
    newTeam: string;
    newTitleUpdated: boolean;
    newDepartmentUpdated: boolean;
    newPriorityUpdated: boolean;
    newStatusUpdated: boolean;
    newTeamUpdated: boolean;
    newDescriptionUpdated: boolean;
  };

  const { ALLPROJECTS_PATH, loading } = useContext(CustomContext);

  const UPDATE_PATH = "update-project";
  const DELETEPROJECT_PATH = "delete-project";

  const [showNow, setShowNow] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [projectInfoForModal, setprojectInfoForModal] = useState<ProjectInterface>({
    projectID: null,
    title: "",
    department: "",
    priority: "",
    team: "",
    status: false,
    description: "",
    newTitle: "",
    newDescription: "",
    newDepartment: "",
    newPriority: "",
    newStatus: "",
    newTeam: "",
    newTitleUpdated: false,
    newDepartmentUpdated: false,
    newPriorityUpdated: false,
    newStatusUpdated: false,
    newTeamUpdated: false,
    newDescriptionUpdated: false,
  });

  const handleShowNow = () => setShowNow(!showNow);
  const handleEditMode = () => setEditMode(!editMode);
  const handleProjectSetForModal = (projectObject: ProjectInterface) => setprojectInfoForModal(projectObject); // Set project info given by employee card

  // **********************************UPDATE Project STATE (UI)
  const handleProjectStateUpdate = (id: number, projectToUpdate: object) => {
    handleSetProjects(
      projects.map((project: { projectID: number }) => {
        if (project.projectID === id) {
          return { ...projectToUpdate };
        } else {
          return { ...project };
        }
      })
    );
  };

  //   ********************************UPDATE PROJECT (DB)
  async function handleProjectUpdate(e: React.FormEvent, id: number, projectToUpdate: ProjectInterface) {
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
      (err: Error) => handleFetchError(err);
    }
  }

  // // UPDATE PROJECT STATE DELETE (UI)
  const handleProjectStateUpdateDelete = (id: number) => {
    handleSetProjects(
      projects.filter((project: { projectID: number }) => {
        const { projectID } = project;
        return projectID !== id;
      })
    );
  };

  const handleDeleteProjectFromDB = (id: number) =>
    deleteProjectFromDB(
      id,
      URL,
      DELETEPROJECT_PATH,
      handleFetchPromiseError,
      handleJsonPromiseResponseLog,
      handleFetchError
    );

  return (
    <section className="all-projects">
      <Container>
        <PageHeaders title={ALLPROJECTS_PATH} />
        <section className="project">
          <div className="project-header-main">
            <h2>New Projects</h2>
            <p>{projects.length} projects</p>
          </div>
          {loading && <div className="loading"></div>}
          {!loading && (
            <Row className="all-projects-row">
              {projects.map((project: ProjectsMapInterface) => {
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
                      handleProjectSetForModal={handleProjectSetForModal}
                      onDelete={handleProjectStateUpdateDelete}
                      handleShowNow={handleShowNow}
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
          description={projectInfoForModal.description}
          handleProjectUpdate={handleProjectUpdate}
        />
      )}
      {deleteNotif && (
        <DeleteNotification
          deleteNotif={deleteNotif}
          response="Project"
        />
      )}
    </section>
  );
};

export default AllProjects;
