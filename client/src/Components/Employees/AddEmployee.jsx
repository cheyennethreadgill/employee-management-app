import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";

const AddEmployee = ({
  URL,
  departmentOptions,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchError,
}) => {
  const PATH = "add-employee";
  const [validated, setValidated] = useState(false);
  const [error, setFormError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form Handling
  const [employeeFormData, setEmployeeFormData] = useState({
    fname: "",
    lname: "",
    gender: "",
    mobile: "",
    password: "",
    designation: "",
    department: "",
    address: "",
    email: "",
    dob: "",
    degree: "",
    image: "",
  });
  const handleEmployeeFormData = (key, value) => {
    setEmployeeFormData({ ...employeeFormData, [key]: value });
  };
  const handleFormSubmissionStatus = () => setFormSubmitted(true);

  // ADD EMPLOYEE TO DB
  async function addEmployeeNow(e) {
    e.preventDefault();
    // // Post options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*" },
      body: JSON.stringify(employeeFormData),
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
        addEmployeeNow(e);
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
          autoComplete="true"
        >
          <Row>
            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="text"
                placeholder="first name *"
                onChange={(e) => {
                  handleEmployeeFormData("fname", e.target.value);
                }}
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
                type="text"
                placeholder="last name"
                onChange={(e) => {
                  handleEmployeeFormData("lname", e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="text"
                placeholder="gender"
                onChange={(e) => {
                  handleEmployeeFormData("gender", e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="tel"
                placeholder="mobile*"
                onChange={(e) => {
                  handleEmployeeFormData("mobile", e.target.value);
                }}
                pattern="[0-9]{10}"
                required
              />
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="text"
                placeholder="enter password*"
                onChange={(e) => {
                  handleEmployeeFormData("password", e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="text"
                placeholder="designation"
                onChange={(e) => {
                  handleEmployeeFormData("designation", e.target.value);
                }}
                required
              />
            </Form.Group>

            <Col lg="6">
              <fieldset>
                <Form.Label htmlFor="select department">Select Department</Form.Label>
                <select
                  name="select department"
                  id="select department"
                  onChange={(e) => {
                    handleEmployeeFormData("department", e.target.value);
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
            </Col>

            <Form.Group
              className="form-group"
              as={Col}
              lg="12"
            >
              <Form.Control
                type="text"
                placeholder="address"
                onChange={(e) => {
                  handleEmployeeFormData("address", e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="text"
                placeholder="email"
                onChange={(e) => {
                  handleEmployeeFormData("email", e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                name="date"
                type="date"
                placeholder="date of birth"
                onChange={(e) => {
                  handleEmployeeFormData("dob", e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="12"
            >
              <Form.Control
                type="text"
                placeholder="Degree"
                onChange={(e) => {
                  handleEmployeeFormData("degree", e.target.value);
                }}
              />
              <Form.Control.Feedback>Looks good</Form.Control.Feedback>
            </Form.Group>

            <fieldset>
              <label htmlFor="image upload">Upload Image</label>
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => {
                  handleEmployeeFormData("image", e.target.value);
                }}
                id="image upload"
              />
            </fieldset>

            {formSubmitted && <p className="fw-medium mt-2">Employee Added Successfully!</p>}
            {error && <p className="fw-bold mt-2">Please correct errors above.</p>}

            <div className="form-btns">
              <Button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </Button>
              <Button
                className=" btn btn-secondary"
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

export default AddEmployee;
