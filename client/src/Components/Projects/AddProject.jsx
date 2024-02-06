import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";

const AddProject = ({ URL, workStatusOptions, priorityOptions, teamOptions, departmentOptions }) => {
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
  async function handleProjectAdd(e) {
    e.preventDefault();
    // Post options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*" },
      body: JSON.stringify({
        title: projectFormData.title,
        projectID: projectFormData.projectID,
        department: projectFormData.department,
        priority: projectFormData.priority,
        client: projectFormData.client,
        price: projectFormData.price,
        startDate: projectFormData.startDate,
        endDate: projectFormData.endDate,
        team: projectFormData.team,
        status: projectFormData.status,
        description: projectFormData.description,
      }),
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}${PATH}`, options);
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
  async function handleSubmit(e) {
    const promiseResponse = await promise(e);

    if (promiseResponse === true) {
      {
        handleProjectAdd(e);
        handleFormSubmissionStatus();
        setValidated(false);
      }
    } else setFormError(true);
  }
  return (
    <>
      <Container>
        <PageHeaders name={PATH} />
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Row>
            <Form.Group
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
                    return <option value={option}>{option}</option>;
                  })}
                </select>
              </fieldset>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please select priority.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
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
                  return <option value={option}>{option}</option>;
                })}
              </select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter a team</Form.Control.Feedback>
            </Form.Group>

            {/* *********WORK STATUS RADIOS */}
            <Form.Group
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

            <div className="form-btns">
              <Button
                className="btn-secondary"
                type="submit"
              >
                Submit
              </Button>
              <Button
                className="btn-danger"
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
