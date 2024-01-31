import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import DashSingleProject from "../Dashboard/DashSingleProject";

const ProjectsDash = () => {
  const URL = "http://localhost:8080/";
  const PATH = "projects";
  const [projects, setProjects] = useState([]);

  // get Project
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setProjects(json));
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [project, setProject] = useState([]);
  const [foundEmployee, setFoundEmployee] = useState([]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleEditMode = () => setEditMode(!editMode);
  const [employeeTeam, setEmployeeTeam] = useState([]);
  const [employees, setEmployees] = useState([]);
  // get employees
  useEffect(() => {
    fetch(`${URL}${PATH}`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
  }, []);

  // for each project we are getting a department
  // we want to get all of the employees that have the same dept as the project department
  //     filter through the employees and return all employees that have the same department as the current project

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
          {" "}
          <h3>Project Name</h3>
          <h3>Employees Team</h3>
          <h3>Team Leader</h3>
          <h3>Priority</h3>
          <h3>Open Task</h3>
          <h3>Completed Task</h3>
          <h3>Status</h3>
          <h3>Documents</h3>
          <h3>Actions</h3>
        </div>
        {projectsMapContent}
        {/* ****************************************************END CARD */}
      </section>
    </Container>
  );
};

export default ProjectsDash;
