import React, { useEffect, useState } from "react";
import Nav from "../Global/Nav";
import ProjectCard from "./ProjectCard";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";

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

  return (
    <>
      <Container>
        <PageHeaders name={PATH} />{" "}
        <section className="project">
          <div className="project-header-main">
            <h2>New Projects</h2>
            <p>3 projects</p>
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
                  md="4"
                >
                  {" "}
                  <ProjectCard
                    URL={URL}
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
                  />
                </Col>
              );
            })}
          </Row>
        </section>
      </Container>
    </>
  );
};

export default AllProjects;
