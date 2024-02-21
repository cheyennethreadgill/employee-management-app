import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";
import { toSentenceCase } from "../../Helpers/strings";
import { handlePasswordValidation } from "../../private/passwordValidation";

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

  const passwordInputOne = useRef();
  const passwordInputTwo = useRef();

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
    dateofbirth: "",
    degree: "",
    image: null,
  });

  const handleEmployeeFormData = (key, value) => {
    setEmployeeFormData({ ...employeeFormData, [key]: value });
  };
  const handleFormSubmissionStatus = () => setFormSubmitted(true);

  // ADD EMPLOYEE TO DB
  async function addEmployeeNow(e, currentTarget) {
    e.preventDefault();

    // use FormData Api to construct the body in request when handling multiform
    const formData = new FormData();
    for (const key in employeeFormData) {
      formData.append(key, employeeFormData[key]);
    }

    // // Post options
    const options = {
      method: "POST",
      // **multipart not needed (multiform header will set automatically with for data api)
      headers: {
        //   // "Content-Type":
        //   //   "multipart/form-data; boundary=---------------------------974767299852498929531610575-----------------------------974767299852498929531610575",
        Accept: "*",
      },
      // **use form data api to construct body instead of json
      // body: JSON.stringify(employeeFormData),
      body: formData,
    };

    // try/catch endpoint
    try {
      const fetchPromiseResponse = await fetch(`${URL}${PATH}`, options);
      handleFetchPromiseError(fetchPromiseResponse);

      const jsonPromiseResponse = fetchPromiseResponse.json();
      handleJsonPromiseResponseLog(jsonPromiseResponse);
    } catch {
      (err) => handleFetchError(err);
    }
    setValidated(!validated);
    currentTarget.reset();
  }

  // const [passwordMatch, setPasswordMatch] = useState(false);
  // console.log(`After useStae: ${passwordMatch}`);

  // const handlePasswordMatchCheck = (e) => {
  //   if (passwordInputOne.current.value === e) {
  //     console.log("password match");
  //     setPasswordMatch(true);
  //   } else {
  //     console.log("error: passwords must match");
  //     setPasswordMatch(false);
  //   }
  // };

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
  async function handleSubmit(e, currentTarget) {
    const promiseResponse = await promise(e);

    if (promiseResponse === true) {
      {
        addEmployeeNow(e, currentTarget);
        handleFormSubmissionStatus();
        setValidated(false);
      }
    } else {
      setFormError(true);
    }
  }

  return (
    <>
      <Container>
        <PageHeaders name={PATH} />
        {/* *****************************************TEST FORM */}
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => {
            handleSubmit(e, e.currentTarget);
          }}
          autoComplete="true"
          encType="multipart/form-data"
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
                  handleEmployeeFormData("fname", toSentenceCase(e.target.value));
                }}
                required
                maxLength={45}
                pattern="^[a-zA-Z]+$"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter valid first name.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="text"
                placeholder="last name *"
                onChange={(e) => {
                  handleEmployeeFormData("lname", toSentenceCase(e.target.value));
                }}
                required
                maxLength={45}
                pattern="^[a-zA-Z]+$"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter valid last name.</Form.Control.Feedback>
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
                  handleEmployeeFormData("gender", toSentenceCase(e.target.value));
                }}
                maxLength={45}
                pattern="^[a-zA-Z]+$"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                  handleEmployeeFormData("mobile", toSentenceCase(e.target.value));
                  console.log(typeof e.target.value);
                }}
                pattern="[0-9]{10}"
                required
              />
              <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                id="userPassword"
                type="password"
                placeholder="Password *"
                onChange={(e) => {
                  handleEmployeeFormData("password", toSentenceCase(e.target.value));
                  handlePasswordValidation(e.target.value);
                }}
                ref={passwordInputTwo}
                required
                minLength={6}
                maxLength={30}
                autoComplete="current-password"
              />

              <Form.Control.Feedback type="invalid">Password must be at least 6 characters.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                  handleEmployeeFormData("designation", toSentenceCase(e.target.value));
                }}
                required
                maxLength={45}
                pattern="^[a-zA-Z]+$"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please enter valid designation.</Form.Control.Feedback>
            </Form.Group>

            <Col lg="6">
              <fieldset>
                <Form.Label htmlFor="select department">Select Department</Form.Label>
                <select
                  name="select department"
                  id="select department"
                  onChange={(e) => {
                    handleEmployeeFormData("department", toSentenceCase(e.target.value));
                  }}
                  required
                  maxLength={45}
                >
                  {departmentOptions.map((option) => {
                    return (
                      <option
                        key={option}
                        value={option}
                      >
                        {toSentenceCase(option)}
                      </option>
                    );
                  })}
                </select>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Please select department.</Form.Control.Feedback>
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
                  handleEmployeeFormData("address", toSentenceCase(e.target.value));
                }}
                required
                pattern="^[a-zA-Z0-9-]+$"
              />
              <Form.Control.Feedback type="invalid">Please enter a valid address.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                  handleEmployeeFormData("email", toSentenceCase(e.target.value));
                }}
                required
                maxLength={45}
              />
              <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                  handleEmployeeFormData("dateofbirth", toSentenceCase(e.target.value));
                }}
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Please select date of birth.</Form.Control.Feedback>
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
                  handleEmployeeFormData("degree", toSentenceCase(e.target.value));
                }}
                maxLength={45}
              />
              <Form.Control.Feedback>Looks good</Form.Control.Feedback>
            </Form.Group>

            <fieldset>
              <label htmlFor="image upload">Upload Image</label>
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg"
                id="image upload"
                name="image"
                onChange={(e) => {
                  handleEmployeeFormData("image", e.target.files[0]);
                }}
              />
            </fieldset>

            {formSubmitted && <p className="fw-medium mt-2">Employee Added Successfully!</p>}
            {error && !formSubmitted && <p className="fw-bold mt-2">Please correct errors above.</p>}
            {error && formSubmitted && <p className="fw-bold mt-2">Please correct errors above.</p>}

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
