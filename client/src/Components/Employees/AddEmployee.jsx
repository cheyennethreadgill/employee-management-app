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

  const [inputErrors, setInputErrors] = useState({
    fileType: false,
    email: false,
    password: false,
  });

  // regex
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:'",<.>/?`~\\|]).{6,}$/;

  // ****************************************************************INPUT CHECKS BEFORE VALIDATION

  const handleInputErrors = (key, value) => {
    setInputErrors({ ...inputErrors, [key]: value });
  };

  // ****************************************************INPUT CHECKS Components

  // function Input Error component
  const InputErrorComponent = ({ errorType, errorPContent }) => {
    if (errorType == "fileType") {
      return (
        <div className="text-danger">
          <p> {errorPContent} </p>
        </div>
      );
    }
    if (errorType == "email") {
      return (
        <div className="text-danger">
          <p> {errorPContent} </p>
        </div>
      );
    }

    if (errorType == "password") {
      return (
        <div className="text-danger">
          <p> {errorPContent} </p>
        </div>
      );
    } else {
      console.log("errorType not found");
    }
  };

  const handlePasswordMatchCheck = (e) => {
    switch (e) {
      case e.length < 10:
        handleInputErrors("password", true);
        console.log("SUCCESS: password contains number");
        break;
      default:
        handleInputErrors("password", false);
        console.log("password case check done");
    }
    // if (!e.includes(typeof number)) {
    //   console.log("password must containe number");
    //   handleInputErrors("password", true);
    // } else {
    //   console.log("SUCCESS: password contains number");
    //   handleInputErrors("password", false);
    // }
  };

  // ********************************************************check functions
  // CLIENT HANDLE FILE CHECK
  const handleFileTypeCheck = (fileName) => {
    let index = fileName.lastIndexOf(".");
    let extension = fileName.substring(-1 + index + 1);

    if (extension !== ".png" && extension !== ".jpeg" && extension !== ".jpg") {
      handleInputErrors("fileType", true);
      console.log(`Please give valid extension: ${extension}`);
    } else {
      handleInputErrors("fileType", false);
      console.log(` valid extension: ${extension}`);
    }
  };

  const handleEmailCheck = (input) => {
    let atindex = input.lastIndexOf("@");
    let dotindex = input.lastIndexOf(".");

    let domain = input.substring(atindex + 1, dotindex);
    let beforeAt = input.substring(0, atindex);
    // console.log(input);
    console.log(beforeAt);

    if (!input.endsWith(".com") || !input.includes("@") || domain === "" || beforeAtIndex === "") {
      handleInputErrors("email", true);
      console.log("Please enter valid email");
    } else {
      handleInputErrors("email", false);
      console.log("correct email with domain");
    }
  };

  // ***********************************************************************************Form Handling
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

  // ********************************************************************************HANLDE UPLOAD
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
      // if theres an error, set state, udate ui to log response
      handleJsonPromiseResponseLog(jsonPromiseResponse, setFormError, InputErrorComponent);
    } catch {
      (err) => {
        handleFetchError(err);
      };
    }
    // setValidated(!validated);
    currentTarget.reset();
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
    console.log(`promise: ${error}`);

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
        setFormError(false);
      }
    } else {
      setFormError(true);
      console.log(`handle submit error: ${error}`);
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
                // pattern="^[a-zA-Z]+$"
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
                // pattern="^[a-zA-Z]+$"
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
                // pattern="^[a-zA-Z]+$"
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
                }}
                pattern="[0-9]{10}"
                required
                maxLength={10}
              />
              <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
            </Form.Group>

            {/* **********************************PASSWORD */}
            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                id="userPassword"
                type="text"
                placeholder="Password *"
                onChange={(e) => {
                  handleEmployeeFormData("password", toSentenceCase(e.target.value));
                  handlePasswordValidation(e.target.value);
                  handlePasswordMatchCheck(e.target.value);
                }}
                ref={passwordInputTwo}
                required
                minLength={6}
                maxLength={30}
                autoComplete="current-password"
                //  pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:'\",<.>/?`~\\|]).{6,}$"
              />

              <Form.Control.Feedback type="invalid">Password must be at least 6 characters.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              {inputErrors.password && (
                <InputErrorComponent
                  errorType="password"
                  errorPContent="Please enter valid email (below input)"
                />
              )}
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
                // pattern="^[a-zA-Z]+$"
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
                // pattern="^[a-zA-Z0-9-]+$"
                maxLength={255}
              />
              <Form.Control.Feedback type="invalid">Please enter a valid address.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            {/* *************************************************EMAIL */}
            <Form.Group
              className="form-group"
              as={Col}
              lg="6"
            >
              <Form.Control
                type="email"
                placeholder="email"
                onChange={(e) => {
                  handleEmployeeFormData("email", toSentenceCase(e.target.value));
                  handleEmailCheck(e.target.value);
                }}
                required
                maxLength={45}
              />
              {/* <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              {inputErrors.email && (
                <InputErrorComponent
                  errorType="email"
                  errorPContent="Please enter a valid email"
                />
              )}
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
                min="1900-01-01"
                max="2003-01-01"
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
                  let name = e.target.files[0].name;
                  handleFileTypeCheck(name);
                }}
              />

              {inputErrors.fileType && (
                <InputErrorComponent
                  errorType="fileType"
                  errorPContent="Please give valid filetype. File Types accepted: .jpg, .png, .jpeg"
                />
              )}
            </fieldset>

            {formSubmitted && <p className="fw-medium mt-2">Employee Added Successfully!</p>}
            {error && !formSubmitted && <p className="text-danger fw-bold mt-2">Please correct errors above.</p>}
            {error && formSubmitted && <p className="text-danger fw-bold mt-2">Please correct errors above.</p>}

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
