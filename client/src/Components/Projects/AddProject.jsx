import React, { useState, useRef } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";

const AddProject = ({
  URL,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchError,
  workStatusOptions,
  priorityOptions,
  teamOptions,
  departmentOptions,
}) => {
  const PATH = "add-project";

  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmissionStatus = () => setFormSubmitted(true);

  // Sets Project form data
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    projectID: "",
    department: "",
    priority: "",
    client: "",
    price: "",
    startDate: "",
    endDate: "",
    team: "",
    status: "",
    description: "",
  });
  const handleProjectFormData = (key, value) => {
    setProjectFormData({ ...projectFormData, [key]: value });
  };

  // fetch project
  async function handleProjectAdd(e, currentTarget) {
    e.preventDefault();
    // Post options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*" },
      body: JSON.stringify(projectFormData),
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}${PATH}`, options);
      handleFetchPromiseError(fetchPromiseResponse);
      const jsonPromiseResponse = fetchPromiseResponse.json();
      handleJsonPromiseResponseLog(jsonPromiseResponse);
    } catch {
      (err) => handleFetchError(err);
    }
    setValidated(!validated);
  }

  // get form validation response
  const [validated, setValidated] = useState(false);
  const [error, setFormError] = useState(false);

  const promise = (e) => {
    const form = e.currentTarget;
    let check = form.checkValidity();
    if (check === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    return new Promise((resolve, reject) => {
      resolve(check);
      reject("ERROR");
    });
  };

  // handle form submission after form validation response is ok
  async function handleSubmit(e, currentTarget) {
    const promiseResponse = await promise(e);

    if (promiseResponse === true) {
      {
        handleProjectAdd(e);
        handleFormSubmissionStatus();
        setValidated(false);
        currentTarget.reset();
      }
    } else {
      setFormError(true);
    }
  }

  return (
    <>
      <Container>
        <PageHeaders name={PATH} />
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => {
            handleSubmit(e, e.currentTarget);
          }}
        >
          <Row>
            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="text"
                placeholder="Project Id *"
                required
                onChange={(e) => {
                  handleProjectFormData("projectID", e.target.value);
                }}
                pattern="[0-9]{4}"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter valid ID. <br></br> ID Must Ccontain 4 numbers.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                onChange={(e) => {
                  handleProjectFormData("title", e.target.value);
                }}
                type="text"
                placeholder="Project title"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter valid title.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <fieldset>
                <Form.Label htmlFor="select department">Select Department</Form.Label>
                <select
                  name="select department"
                  id="select department"
                  onChange={(e) => {
                    handleProjectFormData("department", e.target.value);
                  }}
                  required
                >
                  {departmentOptions.map((option) => {
                    return (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
              </fieldset>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please select department</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <fieldset>
                <Form.Label htmlFor="priority">Priority</Form.Label>
                <select
                  name="priority"
                  id="priority"
                  placeholder="priority"
                  onChange={(e) => {
                    handleProjectFormData("priority", e.target.value);
                  }}
                  required
                >
                  {priorityOptions.map((option) => {
                    return (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
              </fieldset>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please select priority.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                onChange={(e) => {
                  handleProjectFormData("client", e.target.value);
                }}
                type="text"
                placeholder="client*"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter valid name.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                onChange={(e) => {
                  handleProjectFormData("price", e.target.value);
                }}
                type="number"
                placeholder="price*"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter a price.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                onChange={(e) => {
                  handleProjectFormData("startDate", e.target.value);
                }}
                type="date"
                placeholder="start date"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter a start date.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                onChange={(e) => {
                  handleProjectFormData("endDate", e.target.value);
                }}
                type="date"
                placeholder="end date"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter an end date.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="12"
            >
              <Form.Label htmlFor="Team">Team</Form.Label>
              <select
                onChange={(e) => {
                  handleProjectFormData("team", e.target.value);
                  setTeam(e.target.value);
                }}
                name="Team"
                id="Team"
                placeholder="Team"
                required
              >
                {teamOptions.map((option) => {
                  return (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  );
                })}
              </select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter a team</Form.Control.Feedback>
            </Form.Group>

            {/* *********WORK STATUS RADIOS */}
            <Form.Group
              className="form-group"
              as={Col}
              lg="12"
            >
              <fieldset className="work-status">
                <p>Work Status</p>
                {workStatusOptions.map((option) => {
                  return (
                    <React.Fragment key={option}>
                      <input
                        className="radio"
                        type="radio"
                        name="status"
                        value={option}
                        onClick={(e) => {
                          handleProjectFormData("status", e.target.value);
                        }}
                      />
                      <Form.Label htmlFor={option}>{option} </Form.Label>
                    </React.Fragment>
                  );
                })}
              </fieldset>

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please select a work status.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="12"
            >
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleProjectFormData("description", e.target.value);
                }}
                type="text"
                id="description"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter a description</Form.Control.Feedback>
            </Form.Group>

            {/* *******************************************************FORM BUTTONS */}
            <div className="form-btns">
              <Button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </Button>
              <Button
                className="btn-secondary"
                type="button"
              >
                Cancel
              </Button>
            </div>

            {formSubmitted ? <p className=" fw-medium mt-2">Project Added Successfully!</p> : null}
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddProject;
