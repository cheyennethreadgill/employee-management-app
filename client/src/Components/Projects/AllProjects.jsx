import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";
import ProjectModal from "../Global/ProjectModal";

const AllProjects = () => {
  // const URL = "http://localhost:8080/";
  const URL = "https://employee-management-app-rho.vercel.app/";
  const PATH = "projects";
  const [projects, setProjects] = useState([]);

  // get Project
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setProjects(json));
  }, []);

  const [showNow, setShowNow] = useState(false);
  const handleShowNow = () => setShowNow(!showNow);
  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => setEditMode(!editMode);

  const [projectInfoForModal, setprojectInfoForModal] = useState({});

  const handleProjectSet = (values) => {
    setprojectInfoForModal(values);
  };

  const handleProjectStateUpdateDelete = (id) => {
    setProjects(
      projects.filter((project) => {
        return project.projectID === id;
      })
    );
  };

  // UPDATE PROJECT STATE (UI)
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
      const fetchPromiseResponse = await fetch(`${URL}update-project`, options);
      if (!fetchPromiseResponse.ok) {
        console.log(`Something went wrong with fetch from server ${fetchPromiseResponse.status}`);
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

  // DELETE EMPLOYEE From DB
  async function deleteProjectFromDB(id) {
    // Post options
    const options = {
      method: "DELETE",
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}delete-project/${id}`, options);
      if (!fetchPromiseResponse.ok) {
        console.log(`Something went wrong with fetch from server ${fetchPromiseResponse.status}`);
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
    <section className="all-projects">
      <Container>
        <PageHeaders name={PATH} />
        <section className="project">
          <div className="project-header-main">
            <h2>New Projects</h2>
            <p>{projects.length}projects</p>
          </div>

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
                    setnewTitle={projectInfoForModal.setnewTitle}
                    newDepartment={projectInfoForModal.newDepartment}
                    setnewDepartment={projectInfoForModal.setnewDepartment}
                    newPriority={projectInfoForModal.newPriority}
                    setnewPriority={projectInfoForModal.setnewPriority}
                    newStatus={projectInfoForModal.newStatus}
                    setnewStatus={projectInfoForModal.setnewStatus}
                    newTeam={projectInfoForModal.newTeam}
                    setnewTeam={projectInfoForModal.setnewTeam}
                    newTitleUpdated={projectInfoForModal.newTitleUpdated}
                    setnewTitleUpdated={projectInfoForModal.setnewTitleUpdated}
                    setnewDescription={projectInfoForModal.setnewDescription}
                    newDepartmentUpdated={projectInfoForModal.newDepartmentUpdated}
                    setnewDepartmentUpdated={projectInfoForModal.setnewDepartmentUpdated}
                    newPriorityUpdated={projectInfoForModal.newPriorityUpdated}
                    setnewPriorityUpdated={projectInfoForModal.setnewPriorityUpdated}
                    newStatusUpdated={projectInfoForModal.newStatusUpdated}
                    setnewStatusUpdated={projectInfoForModal.setnewStatusUpdated}
                    newTeamUpdated={projectInfoForModal.newTeamUpdated}
                    newDescriptionUpdated={projectInfoForModal.newDescriptionUpdated}
                    setnewTeamUpdated={projectInfoForModal.setnewTeamUpdated}
                    handleProjectUpdate={handleProjectUpdate}
                    deleteProjectFromDB={deleteProjectFromDB}
                  />
                </Col>
              );
            })}
          </Row>
        </section>
      </Container>
      {/* ***************************************************SHOW MODAL */}
      {!showNow ? null : (
        <ProjectModal
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
    </section>
  );
};

export default AllProjects;
