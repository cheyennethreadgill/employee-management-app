import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import DashSingleProject from "../Dashboard/DashSingleProject";

const ProjectsDash = ({ URL }) => {
  // set Employee team (tbw)
  // useEffect(() => {
  //   projects.map((proj) => {
  //     const empl = employees.filter((employee) => {
  //       if (employee.department == proj.department) {
  //         return employee;
  //       }
  //     });
  //     setEmployeeTeam([empl]);
  //   });
  // }, []);
  const PATH = "projects";
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

  // State
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeTeam, setEmployeeTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLoadingState = (value) => setLoading(value);
  const handleEditMode = () => setEditMode(!editMode);

  // fetch Projects
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setProjects(json));
    handleLoadingState(false);
  }, []);

  // get employees
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
  }, []);

  // Project Card Content
  const projectsMapContent = projects.map((project) => {
    const { projectID, title, department, priority, team, status } = project;

    return (
      <DashSingleProject
        employeeTeam={employeeTeam}
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
    <Container>
      <section className="dash-projects-card">
        <h1>projects</h1>
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
