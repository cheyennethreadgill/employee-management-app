import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
const loginimg = require("../../images/sign-up-img.png");
import { useToken } from "../../Hooks/useToken";
import { useUser } from "../../Hooks/useUser";

const SignUpPage = ({ URL }) => {
  // const URL = "http://localhost:8080/auth/";
  const SIGNUP_PATH = "auth/sign-up";
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [token, setToken] = useToken();
  const [user, setUser] = useUser();

  const [passwordToggle, setPasswordToggle] = useState(false);

  const [signUpAuth, setSignUpAuth] = useState({
    signUpError: false,
    response: "",
  });

  interface FormDataInterface {
    username: string;
    email: string;
    password: string;
  }

  const [formData, setformData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    image: " ",
  });


  const handleFormData = (key, value) => {
    setformData({ ...formData, [key]: value });
  };

  async function handleAddUserFromSignIn(e: FormEvent<HTMLFormElement>, formData: FormDataInterface) {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    try {
      const options = {
        method: "POST", //post sign up client credentials to DB
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };
      const fetchresponse = await fetch(`${URL}${SIGNUP_PATH}`, options);
      const jsonResonse = await fetchresponse.json();
      if (!fetchresponse.ok) {
        setSignUpAuth({ ...signUpAuth, signUpError: true, response: jsonResonse });
        console.log(`Sign up error: ${signUpAuth.signUpError}`);
        console.log(`Sign up response: ${signUpAuth.response}`);
        console.log(jsonResonse)
        form.reset();
      } else {
        navigate("/auth/login");
        setToken(jsonResonse.token);
        setSignUpAuth({ signUpError: false, response: "" });
        form.reset();
      }
    } catch (err) {
      console.log(err);
    }

    setValidated(false);
  }

  return (
    <section className="sign-up">
      <Row>
        <Col
          lg="6"
          md="12"
          sm="12"
          className="p-0 m-0"
        >
          <img src={loginimg} />
        </Col>
        <Col
          lg="6"
          md="12"
          sm="12"
          className="col-container"
        >
          <div className="sign-up-right-info flex-column d-flex justify-content-center">
            <Form.Label
              className="fs-2 fw-medium text-dark"
              htmlFor="Sign up form"
            >
              Sign Up
            </Form.Label>
            <p className="fs-5 pb-4 text-muted">Enter details to create your account </p>
            
            
            {signUpAuth.signUpError && <p className="text-danger fw-bold">{JSON.stringify(signUpAuth.response)}</p>}

            <Form
              noValidate
              validated={validated}
              onSubmit={(e) => {
                handleAddUserFromSignIn(e, formData);
                e.preventDefault();
              }}
              autoComplete="on"
            >
              <Form.Group>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input mt-3"
                    name="fname"
                    type="text"
                    placeholder="First name*"
                    required
                    minLength={5}
                    onChange={(e) => {
                      const targetValue = e.target.value;
                      handleFormData("fname", targetValue);
                    }}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-regular fa-user"></i>
                  </span>
                </div>

                <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input mt-3"
                    name="lName"
                    type="text"
                    placeholder="Last name*"
                    required
                    minLength={5}
                    onChange={(e) => {
                      const targetValue = e.target.value;
                      handleFormData("lname", targetValue);
                    }}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-regular fa-user"></i>
                  </span>
                </div>

                <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input mt-3"
                    name="username"
                    type="text"
                    placeholder="Username*"
                    required
                    minLength={5}
                    onChange={(e) => {
                      const targetValue = e.target.value;
                      handleFormData("username", targetValue);
                    }}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-regular fa-circle-user"></i>{" "}
                  </span>
                </div>

                <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input mt-3"
                    name="email"
                    type="email"
                    placeholder="Email*"
                    required
                    onChange={(e) => {
                      const targetValue = e.target.value;
                      handleFormData("email", targetValue);
                    }}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-regular fa-envelope"></i>{" "}
                  </span>
                </div>
                <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input mt-3"
                    name="password"
                    type="password"
                    placeholder="Password*"
                    minLength={8}
                    required
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-regular fa-user"></i>
                  </span>
                </div>
                <Form.Control.Feedback type="invalid">Please enter a valid password.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
              </Form.Group> */}

              {/* --------------------------------------CONFIRM PASSWORD */}
              <Form.Group>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input mt-3"
                    name="password"
                    type={passwordToggle ? "text" : "password"}
                    placeholder="Password*"
                    minLength={8}
                    required
                    onChange={(e) => {
                      const targetValue = e.target.value;
                      handleFormData("password", targetValue);
                    }}
                  />
                  <span
                    onClick={() => {
                      setPasswordToggle(!passwordToggle);
                    }}
                    className="form-control-container-icon_end form-control-container-icon_end_password"
                  >
                    {passwordToggle ? (
                      <i className="fa-regular fa-eye"></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash"></i>
                    )}{" "}
                  </span>
                </div>
                <Form.Control.Feedback type="invalid">Please enter a valid password.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
              </Form.Group>

              <div className="pt-3">
                <a
                  className="auth-links flex-grow-1 ps-2 pe-1"
                  href="#"
                >
                  Already Registered?
                </a>
                <button
                  className="text-primary btn-none"
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                >
                  Login
                </button>
              </div>
              <br />

              <br />
              <button
                className="btn btn-primary w-100 py-3 sign-up-btn"
                type="submit"
              >
                Register
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default SignUpPage;
