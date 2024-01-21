import React, { useState } from "react";
import Nav from "../Global/Nav";
import { Form, Container, Button } from "react-bootstrap";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("");
  const [client, setClient] = useState(0);
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [team, setTeam] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const URL = "http://localhost:8080";

  // fetch for data
  async function handleProjectAdd() {
    // Post options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
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
      const fetchPromiseResponse = await fetch(`${URL}/add-project`, options);
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
      <Nav />
      <Container>
        <Form
          action=""
          onSubmit={handleProjectAdd}
        >
          <Form.Label htmlFor="">Add Project</Form.Label>
          <Form.Control
            type="text"
            placeholder="Project Id *"
            required={true}
            onKeyUp={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Form.Control
            onKeyUp={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Project title"
          />
          <fieldset>
            <legend htmlFor="select department">Select Department</legend>
            <select
              name="select department"
              id="select department"
              placeholder="Select Department"
              onKeyUp={(e) => {
                setDepartment(e.target.value);
              }}
              required={true}
              defaultValue="designing"
            >
              <option value="development">Development</option>
              <option value="designing">designing</option>
              <option value="testing">testing</option>
              <option value="hr">HR</option>
            </select>
          </fieldset>
          <fieldset>
            <legend htmlFor="priority">priority</legend>
            <select
              name="priority"
              id="priority"
              placeholder="priority"
              onKeyUp={(e) => {
                setPriority(e.target.value);
              }}
              required={true}
              defaultValue="medium"
            >
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
          </fieldset>
          <Form.Control
            onKeyUp={(e) => {
              setClient(e.target.value);
            }}
            type="text"
            placeholder="client*"
            required={true}
          />
          <Form.Control
            onKeyUp={(e) => {
              setPrice(e.target.value);
            }}
            type="number"
            placeholder="price*"
            required={true}
          />
          <Form.Control
            onKeyUp={(e) => {
              setStartDate(e.target.value);
            }}
            type="date"
            placeholder="start date"
          />
          <Form.Control
            onKeyUp={(e) => {
              setEndDate(e.target.value);
            }}
            type="date"
            placeholder="end date"
          />
          <br />
          <br />
          <Form.Label htmlFor="Team">Team</Form.Label>
          <select
            onKeyUp={(e) => {
              setTeam(e.target.value);
            }}
            name="Team"
            id="Team"
            placeholder="Team"
            required={true}
          >
            <option value="sarah">sarah</option>
            <option value="michelle">michelle</option>
            <option value="kelly">kelly</option>
          </select>
          <br />
          <br />
          {/* *********WORK STATUS RADIOS */}
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

          <Form.Label htmlFor="description">Description</Form.Label>
          <input
            onKeyUp={(e) => {
              setDescription(e.target.value);
              console.log(e.target.value);
            }}
            type="text"
            id="description"
          />
          <br />
          <div className="">
            {" "}
            <Form.Label>upload image</Form.Label>
            <Form.Control
              className="upload-control"
              type="file"
            />
          </div>

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
        </Form>
      </Container>
    </>
  );
};

export default AddProject;
