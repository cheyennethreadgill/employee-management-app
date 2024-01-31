import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";

const AddEmployee = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmissionStatus = () => setFormSubmitted(true);

  const URL = "http://localhost:8080/";
  // const URL = "https://employee-management-app-rho.vercel.app/";
  const PATH = "add-employee";

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState(0);
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [degree, setDegree] = useState("");
  const [image, setImage] = useState("");

  // ADD EMPLOYEE TO DB
  async function addEmployeeNow() {
    console.log("posted");
    // // Post options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*" },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        gender: gender,
        mobile: mobile,
        password: password,
        designation: designation,
        department: department,
        address: address,
        email: email,
        dateofbirth: dob,
        degree: degree,
        image: image,
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

  const [validated, setValidated] = useState(false);
  const [error, setFormError] = useState(false);

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
        addEmployeeNow();
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
                  setFname(e.target.value);
                }}
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter valid name.
              </Form.Control.Feedback>
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
                  setLname(e.target.value);
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
                  setGender(e.target.value);
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
                  setMobile(e.target.value);
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
                  setPassword(e.target.value);
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
                  setDesignation(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Col lg="6">
              <fieldset>
                <select
                  name="select department"
                  id="select department"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                  required
                >
                  <option
                    defaultValue={true}
                    value="null"
                  >
                    Select Department
                  </option>
                  <option value="development">Development</option>
                  <option value="designing">Designing</option>
                  <option value="testing">Testing</option>
                  <option value="hr">HR</option>
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
                  setAddress(e.target.value);
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
                  setEmail(e.target.value);
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
                  setDOB(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="12"
            >
              {" "}
              <Form.Control
                type="text"
                placeholder="Degree"
                onChange={(e) => {
                  setDegree(e.target.value);
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
                  setImage(e.target.value);
                }}
                id="image upload"
              />
            </fieldset>

            {formSubmitted ? (
              <p className="fw-medium mt-2">Employee Added Successfully!</p>
            ) : error ? (
              <p className="fw-bold mt-2">Please correct errors above.</p>
            ) : null}

            <Button
              className="btn btn-success"
              type="submit"
            >
              Submit
            </Button>
            <Button
              className=" btn btn-danger"
              type="button"
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddEmployee;
