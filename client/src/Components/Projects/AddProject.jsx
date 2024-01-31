import React, { useState, useRef } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [projectID, setProjectID] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("");
  const [client, setClient] = useState(0);
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [team, setTeam] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmissionStatus = () => setFormSubmitted(true);
  const URL = "http://localhost:8080/";
  // const URL = "https://employee-management-app-rho.vercel.app/";
  const PATH = "add-project";

  // fetch for data
  async function handleProjectAdd(e) {
    e.preventDefault();
    // Post options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*" },
      body: JSON.stringify({
        title: title,
        projectID: projectID,
        department: department,
        priority: priority,
        client: client,
        price: price,
        startDate: startDate,
        endDate: endDate,
        team: team,
        status: status,
        description: description,
      }),
    };

    try {
      const fetchPromiseResponse = await fetch(`${URL}${PATH}`, options);
      if (!fetchPromiseResponse.ok) {
        console.log(
          `Something went wrong with fetch from server ${fetchPromiseResponse.status}`
        );
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
    // return check;
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
                  setProjectID(e.target.value);
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
                  setTitle(e.target.value);
                }}
                type="text"
                placeholder="Project title"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter valid title.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              lg="6"
            >
              <fieldset>
                <Form.Label htmlFor="select department">
                  Select Department
                </Form.Label>
                <select
                  name="select department"
                  id="select department"
                  placeholder="Select Department"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  required
                >
                  <option
                    defaultValue={true}
                    value="null"
                  >
                    Choose Option
                  </option>
                  <option value="development">Development</option>
                  <option value="designing">Designing</option>
                  <option value="testing">Testing</option>
                  <option value="hr">HR</option>
                </select>
              </fieldset>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please select department
              </Form.Control.Feedback>
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
                    setPriority(e.target.value);
                  }}
                  required
                >
                  <option
                    defaultValue={true}
                    value="null"
                  >
                    Choose Option
                  </option>
                  <option value="high">high</option>
                  <option value="medium">medium</option>
                  <option value="low">low</option>
                </select>
              </fieldset>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please select priority.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              lg="6"
            >
              <Form.Control
                onChange={(e) => {
                  setClient(e.target.value);
                }}
                type="text"
                placeholder="client*"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              lg="6"
            >
              <Form.Control
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
                placeholder="price*"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a price.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              lg="6"
            >
              <Form.Control
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                type="date"
                placeholder="start date"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a start date.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              lg="6"
            >
              <Form.Control
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                type="date"
                placeholder="end date"
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter an end date.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              lg="12"
            >
              <Form.Label htmlFor="Team">Team</Form.Label>
              <select
                onChange={(e) => {
                  setTeam(e.target.value);
                }}
                name="Team"
                id="Team"
                placeholder="Team"
                required
                def
              >
                <option
                  defaultValue={true}
                  value="null"
                >
                  Choose Option
                </option>
                <option value="sarah">sarah</option>
                <option value="michelle">michelle</option>
                <option value="kelly">kelly</option>
              </select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a team
              </Form.Control.Feedback>
            </Form.Group>

            {/* *********WORK STATUS RADIOS */}
            <Form.Group
              as={Col}
              lg="12"
            >
              <fieldset className="work-status">
                <p>Work Status</p>
                <input
                  className="radio"
                  type="radio"
                  name="status"
                  value="active"
                  onClick={(e) => {
                    setStatus(e.target.value);
                  }}
                />
                <Form.Label htmlFor="Active">Active </Form.Label>
                <input
                  className="radio"
                  type="radio"
                  name="status"
                  onClick={(e) => {
                    setStatus(e.target.value);
                  }}
                  value="completed"
                />
                <Form.Label htmlFor="completed">completed</Form.Label>
                <input
                  className="radio"
                  type="radio"
                  name="status"
                  onClick={(e) => {
                    setStatus(e.target.value);
                  }}
                  value="running"
                />
                <Form.Label htmlFor="">running</Form.Label>
                <input
                  className="radio"
                  type="radio"
                  name="status"
                  onClick={(e) => {
                    setStatus(e.target.value);
                  }}
                  value="pending"
                />
                <Form.Label htmlFor="">pending</Form.Label>
                <input
                  className="radio"
                  type="radio"
                  name="status"
                  onClick={(e) => {
                    setStatus(e.target.value);
                  }}
                  value="not started"
                />
                <Form.Label htmlFor="">not started</Form.Label>
                <input
                  className="radio"
                  type="radio"
                  name="status"
                  onClick={(e) => {
                    setStatus(e.target.value);
                  }}
                  value="canceled"
                />
                <Form.Label htmlFor="">canceled</Form.Label>
              </fieldset>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please select a work status.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              lg="12"
            >
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                id="description"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a description
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              lg="12"
            >
              <div className="">
                {" "}
                <Form.Label>upload file</Form.Label>
                <Form.Control
                  className="upload-control"
                  type="file"
                  accept=".pdf,.doc"
                />
              </div>
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

            {formSubmitted ? (
              <p className=" fw-medium mt-2">Project Added Successfully!</p>
            ) : null}
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddProject;
