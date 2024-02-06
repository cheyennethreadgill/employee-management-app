import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import DashSingleProject from "../Dashboard/DashSingleProject";

const ProjectsDash = ({ URL }) => {
  const PATH = "projects";
  const [projects, setProjects] = useState([]);
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

  // get Project
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setProjects(json));
  }, []);

  const [editMode, setEditMode] = useState(false);

  const [show, setShow] = useState(false);

  const handleEditMode = () => setEditMode(!editMode);
  const [employeeTeam, setEmployeeTeam] = useState([]);
  const [employees, setEmployees] = useState([]);

  // get employees
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
  }, []);

  useEffect(() => {
    projects.map((proj) => {
      const empl = employees.filter((employee) => {
        if (employee.department == proj.department) {
          return employee;
        }
      });
      setEmployeeTeam([empl]);
    });
    console.log(employeeTeam);
  }, []);

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
      {" "}
      <section className="dash-projects-card">
        <h1>projects</h1>
        <div className="dash-projects-card-titles">
          {titles.map((title) => {
            return <h3> {title} </h3>;
          })}
        </div>
        {projectsMapContent}
        {/* ****************************************************END CARD */}
      </section>
    </Container>
  );
};

export default ProjectsDash;
