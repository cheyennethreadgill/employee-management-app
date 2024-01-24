import React, { useState } from "react";
import Nav from "../Global/Nav";
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
  const URL = "https://employee-management-app-rho.vercel.app/";
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
  }
  return (
    <>
      <Container>
        <PageHeaders name={PATH} />
        <Form
          action=""
          onSubmit={(e) => {
            handleProjectAdd(e);
          }}
        >
          <Row>
            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="Project Id *"
                required={true}
                onKeyUp={(e) => {
                  setProjectID(e.target.value);
                }}
              />
            </Col>
            <Col lg="6">
              <Form.Control
                onKeyUp={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                placeholder="Project title"
              />
            </Col>
            <Col lg="6">
              <fieldset>
                <legend htmlFor="select department">Select Department</legend>
                <select
                  name="select department"
                  id="select department"
                  placeholder="Select Department"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  required={true}
                >
                  <option
                    defaultValue={true}
                    value="null"
                  >
                    Choose Option
                  </option>
                  <option value="development">Development</option>
                  <option value="designing">designing</option>
                  <option value="testing">testing</option>
                  <option value="hr">HR</option>
                </select>
              </fieldset>
            </Col>
            <Col lg="6">
              <fieldset>
                <legend htmlFor="priority">priority</legend>
                <select
                  name="priority"
                  id="priority"
                  placeholder="priority"
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                  required={true}
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
            </Col>
            <Col lg="6">
              <Form.Control
                onKeyUp={(e) => {
                  setClient(e.target.value);
                }}
                type="text"
                placeholder="client*"
                required={true}
              />
            </Col>
            <Col lg="6">
              <Form.Control
                onKeyUp={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
                placeholder="price*"
                required={true}
              />
            </Col>
            <Col lg="6">
              <Form.Control
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                type="date"
                placeholder="start date"
              />
            </Col>
            <Col lg="6">
              <Form.Control
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                type="date"
                placeholder="end date"
              />
            </Col>
            <Col lg="12">
              <Form.Label htmlFor="Team">Team</Form.Label>
              <select
                onChange={(e) => {
                  setTeam(e.target.value);
                }}
                name="Team"
                id="Team"
                placeholder="Team"
                required={true}
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
            </Col>

            {/* *********WORK STATUS RADIOS */}
            <Col lg="12">
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
            </Col>

            <Col lg="12">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                onKeyUp={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                id="description"
              />
            </Col>
            <Col lg="12">
              <div className="">
                {" "}
                <Form.Label>upload image</Form.Label>
                <Form.Control
                  className="upload-control"
                  type="file"
                />
              </div>
            </Col>

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
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddProject;
