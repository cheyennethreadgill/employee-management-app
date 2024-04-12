import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";
import { toSentenceCase } from "../../Helpers/strings";
import { AddSuccessful } from "../Global/Notifications";

const AddProject = ({
  URL,
  projects,
  ServerErrorComponent,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchError,
  workStatusOptions,
  priorityOptions,
  teamOptions,
  departmentOptions,
}) => {
  const ADDPROJECT_PATH = "add-project";

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectExists, setProjectExists] = useState(false);

  // handle Project id check
  function handleProjectIDValidation(id: string) {
    if (id.length < 4) {
      setProjectExists(false);
    }

    if (id.length === 4) {
      const findProject: Promise<{ projectID: string }> = new Promise((resolve, reject) => {
        const found = projects.find((project: { projectID: string }) => {
          return id == project.projectID;
        });
        resolve(found);
        reject("ERROR with finding project match.");
      });

      findProject
        .then((found) => {
          if (found) {
            if (found.projectID == id) {
              setProjectExists(!projectExists);
            } else {
              console.log("Project not found.");
              return null;
            }
          }
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("Project Finder Complete."));
    }
  }

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
    status: "active",
    description: "",
  });

  const handleProjectFormData = (key: string, value: string) => {
    setProjectFormData({ ...projectFormData, [key]: value });
  };
  const handleFormSubmissionStatus = () => setFormSubmitted(true);

  // fetch project
  async function handleProjectAdd(e: React.FormEvent) {
    e.preventDefault();
    // Post options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*" },
      body: JSON.stringify(projectFormData),
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}${ADDPROJECT_PATH}`, options);
      handleFetchPromiseError(fetchPromiseResponse);
      const jsonPromiseResponse = fetchPromiseResponse.json();
      handleJsonPromiseResponseLog(jsonPromiseResponse, setFormError);
    } catch (err) {
      handleFetchError(err);
    }
  }

  // get form validation response
  const [validated, setValidated] = useState(false);
  const [error, setFormError] = useState(false);

  function promise(e: React.FormEvent): Promise<boolean> {
    const formElement = e.currentTarget as HTMLFormElement;
    let check = formElement.checkValidity();

    if (check === false) {
      e.preventDefault();
      e.stopPropagation();
      setProjectExists(true);
    }

    setValidated(true);

    return new Promise((resolve, reject) => {
      resolve(check);
      reject("ERROR");
    });
  }

  // handle form submission after form validation response is ok
  async function handleSubmit(e: React.FormEvent, currentTarget: HTMLFormElement) {
    setProjectExists(false);

    const promiseResponse = await promise(e);

    if (promiseResponse === true) {
      {
        handleProjectAdd(e);
        handleFormSubmissionStatus();
        setValidated(false);
        currentTarget.reset();
        setProjectExists(false);
      }
    } else {
      setFormError(true);
    }
  }

  return (
    <>
      <Container>
        <PageHeaders title={ADDPROJECT_PATH} />
        <Form
          className="add-project-form"
          noValidate
          validated={validated}
          onSubmit={(e) => {
            !projectExists && handleSubmit(e, e.currentTarget);
            e.preventDefault();
          }}
          autoComplete="true"
        >
          {error && <ServerErrorComponent />}
          <Row>
            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="text"
                placeholder="Project ID *"
                required
                onChange={(e) => {
                  handleProjectFormData("projectID", toSentenceCase(e.target.value));
                  handleProjectIDValidation(e.target.value);
                }}
                pattern="[0-9]{4}"
                maxLength={4}
              />

              {projectExists && <p className="text-danger">Project already exists.</p>}
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
                  handleProjectFormData("title", toSentenceCase(e.target.value));
                }}
                type="text"
                placeholder="Project Title *"
                required
                maxLength={255}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter valid title.</Form.Control.Feedback>
            </Form.Group>

            {/* ************************************************************DEPT */}
            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <fieldset>
                <Form.Label htmlFor="select department">Select Department</Form.Label>
                <Form.Select
                  name="select department"
                  id="select department"
                  onChange={(e) => {
                    handleProjectFormData("department", toSentenceCase(e.target.value));
                  }}
                  required
                >
                  {departmentOptions.map((option) => {
                    return (
                      <option
                        key={option}
                        value={option === "" ? "" : option}
                      >
                        {option === "" ? "--Select Option--" : toSentenceCase(option)}
                      </option>
                    );
                  })}
                </Form.Select>
              </fieldset>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please select department</Form.Control.Feedback>
            </Form.Group>

            {/* *********************************************************PRIORITY */}
            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <fieldset>
                <Form.Label htmlFor="priority">Priority</Form.Label>
                <Form.Select
                  name="priority"
                  id="priority"
                  defaultValue="priority"
                  onChange={(e) => {
                    handleProjectFormData("priority", toSentenceCase(e.target.value));
                  }}
                  required
                >
                  {priorityOptions.map((option) => {
                    return (
                      <option
                        key={option === "" ? null : option}
                        value={option === "" ? "" : option}
                      >
                        {option === "" ? "--Select Option--" : toSentenceCase(option)}
                      </option>
                    );
                  })}
                </Form.Select>
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
                  handleProjectFormData("client", toSentenceCase(e.target.value));
                }}
                type="text"
                placeholder="Client *"
                required
                maxLength={255}
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
                  handleProjectFormData("price", toSentenceCase(e.target.value));
                }}
                type="number"
                placeholder="Price *"
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
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleProjectFormData("startDate", toSentenceCase(e.target.value));
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
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleProjectFormData("endDate", toSentenceCase(e.target.value));
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
              <Form.Select
                onChange={(e) => {
                  handleProjectFormData("team", toSentenceCase(e.target.value));
                }}
                name="Team"
                id="Team"
                defaultValue="Team"
                required
              >
                {teamOptions.map((option) => {
                  return (
                    <option
                      key={option === "" ? null : option}
                      value={option === "" ? "" : option}
                    >
                      {option === "" ? "--Select Option--" : option}
                    </option>
                  );
                })}
              </Form.Select>
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
                {workStatusOptions.map((option: string) => {
                  return (
                    <React.Fragment key={option}>
                      <input
                        className="radio"
                        type="radio"
                        name="status"
                        value={option}
                        onClick={(e) => {
                          handleProjectFormData("status", toSentenceCase((e.target as HTMLInputElement).value));
                        }}
                        defaultChecked={option == "active"}
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
                  handleProjectFormData("description", toSentenceCase(e.target.value));
                }}
                type="text"
                id="description"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter a description</Form.Control.Feedback>
            </Form.Group>

            {projectExists && <p>Please Correct Error Above</p>}
            {formSubmitted && <AddSuccessful thingAdded="project" />}

            {/* *******************************************************FORM BUTTONS */}
            <div className="form-btns">
              <Button
                className="btn btn-primary"
                type={projectExists ? null : "submit"}
                role="button"
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
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddProject;
