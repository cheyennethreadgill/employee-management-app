import React, { useEffect, useState } from "react";
import Nav from "../Global/Nav";

export const AllProjects = () => {
  // get Project
  useEffect(() => {
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((json) => setProjects(json));
  }, []);

  const URL = "http://localhost:8080";
  const [projects, setProjects] = useState([]);

  return (
    <>
      <Nav />

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
          <section
            className="project-card"
            key={projectID}
          >
            <h1>New Projects</h1>
            <p>3 projects</p>
            <h2>Proj Name</h2>
            <div style={{ display: "flex" }}>
              <p>Created</p>
              <p> {startDate} </p>
            </div>
            <div style={{ display: "flex" }}>
              <p>Team Lead</p>
              <p>My Nmae</p>
            </div>
            <div style={{ display: "flex" }}>
              <p>Priority</p>
              <p> {priority} </p>
            </div>
            <div style={{ display: "flex" }}>
              <p>Dealine</p>
              <p> {endDate} </p>
            </div>
            <div style={{ display: "flex" }}>
              <p>Comments</p>
              <p> {description} </p>
            </div>
            <div style={{ display: "flex" }}>
              <p>Bug</p>
              <p>Mobile</p>
            </div>
            <div style={{ display: "flex" }}>
              <p>Team</p>
              {team}
              <img
                src=""
                alt="picssss"
              />
            </div>
          </section>
        );
      })}
    </>
  );
};
