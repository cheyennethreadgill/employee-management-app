import { Row, Container, Col } from "react-bootstrap";

const ProjectCard = ({
  URL,
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
}) => {
  return (
    <section className="project-card">
      <div className="project-card-header">
        <h3> {title} </h3>
        {status == "active" ? (
          <p className="project-card-header-status project-card-header-status_active info">
            {" "}
            {status}{" "}
          </p>
        ) : status == "running" ? (
          <p className="project-card-header-status project-card-header-status_running info">
            {" "}
            {status}{" "}
          </p>
        ) : status == "completed" ? (
          <p className="project-card-header-status project-card-header-status_completed info">
            {" "}
            {status}{" "}
          </p>
        ) : status == "pending" ? (
          <p className="project-card-header-status project-card-header-status_pending info">
            {" "}
            {status}{" "}
          </p>
        ) : status == "not-started" ? (
          <p className="project-card-header-status project-card-header-status_not info-started">
            {" "}
            {status}{" "}
          </p>
        ) : (
          <p className="project-card-header-status project-card-header-status_canceled info">
            {" "}
            {status}{" "}
          </p>
        )}
      </div>
      <p className="description"> {description} </p>

      <Row>
        <Col>
          <p className="info">Created</p>
          <p className="info">Team Lead</p>
          <p className="info">Priority</p>
          <p className="info">Dealine</p>

          <p className="info">Bug</p>
          <p className="info">Team</p>
        </Col>
        <Col>
          <p className="info calendar">
            <i className="fa-regular fa-calendar-days"></i>{" "}
            {startDate ? startDate : "None"}{" "}
          </p>
          <p className="info">{team ? team : "None"}</p>
          <p className="priority">
            {" "}
            <span className="priority-icon">
              {" "}
              {priority === "high" ? (
                <i className="fa-solid fa-angle-up priority-icon-high"></i>
              ) : priority === "medium" ? (
                <i className="fa-solid fa-greater-than priority-icon-medium"></i>
              ) : (
                <i className="fa-solid fa-angle-down priority-icon-low"></i>
              )}{" "}
            </span>{" "}
            {priority ? priority : "None"}{" "}
          </p>
          <p className="info"> {endDate ? endDate : "None"} </p>
          <p className="info">Bug</p>
          <p className="info">{department ? department : "None"}</p>
        </Col>
      </Row>
    </section>
  );
};
export default ProjectCard;
