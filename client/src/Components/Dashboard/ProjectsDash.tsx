import { Container } from "react-bootstrap";
import { useState, useContext } from "react";
import { CustomContext } from "../../index";
import DashSingleProject from "../Dashboard/DashSingleProject";
import PageHeaders from "../Global/PageHeaders";
import { useUser } from "../../Hooks/useUser";

const ProjectsDash = ({ URL, toggled, projects }) => {
  interface ProjectInterface {
    projectID: string;
    title: string;
    department: string;
    priority: string;
    team: string;
    status: string;
  }
  const { loading } = useContext(CustomContext);

  const titles = [
    "Project Name",
    "Employees Team",
    "Team Leader",
    "Priority",
    "Open Task",
    "Completed Task",
    "Status",
    "Documents",
  ];

  const [user] = useUser();

  const { fname } = user;

  // State
  // const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditMode = () => setEditMode(!editMode);

  // Project Card Content
  const projectsMapContent = projects.map((project: ProjectInterface) => {
    const { projectID, title, department, priority, team, status } = project;

    return (
      <DashSingleProject
        URL={URL}
        key={projectID}
        handleEditMode={handleEditMode}
        projectID={projectID}
        title={title}
        department={department}
        priority={priority}
        team={team}
        status={status}
      />
    );
  });

  return (
    <Container className="projects-dash">
      <PageHeaders title="Dashboard" />
      <section className={!toggled ? "dash-projects-card" : "dash-projects-card_toggled"}>
        <h2 className="mb-5 fs-3">Welcome, {fname}!</h2>
        <div className="dash-projects-card-titles">
          {titles.map((title) => {
            return <h3 key={title}> {title} </h3>;
          })}
        </div>

        {loading && <div className="loading"></div>}
        {!loading && projectsMapContent}
        {/* ****************************************************END CARD */}
      </section>
    </Container>
  );
};

export default ProjectsDash;
