import React, { useEffect, useState } from "react";
import Nav from "../Global/Nav";
import ProjectCard from "./ProjectCard";
import Container from "react-bootstrap/esm/Container";
import { Row, Col } from "react-bootstrap";

const AllProjects = () => {
  const URL = "http://localhost:8080";
  const [projects, setProjects] = useState([]);

  // get Project
  useEffect(() => {
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((json) => setProjects(json));
  }, []);

  return (
    <>

      <Container>
        {" "}
        <section className="project">
          <div className="project-header-main">
            <h2>New Projects</h2>
            <p>3 projects</p>
          </div>
          <Row>
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
                  key={projectID}
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
