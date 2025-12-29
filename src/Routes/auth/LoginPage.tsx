import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { useToken } from "../../Hooks/useToken";
import { useUser } from "../../Hooks/useUser";
import { useQueryParams } from "../../utils/useQueryParams";

const loginimg = "../images/login.png";

const LoginPage = ({ URL }) => {
  // interface FormDataInterface {
  //   username: string;
  //   password: string;
  // }

  const GOOGLE_AUTH_URL = "auth/google/url";
  const LOGIN_PATH = "auth/login";

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [user] = useUser();
  const [token, setToken] = useToken();

  const [googleOAuthURL, setGoogleOAuthURL] = useState("");
  const { token: oauthToken } = useQueryParams();

  // // remove any existing token so the auto info can show
  // useEffect(() => {
  //   localStorage.removeItem("token");
  // }, []);

  // set google oauth token if google btn is clicked
  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate("/admin");
    }
  }, [oauthToken, setToken]);

  // auto load general googl oauth url from server
  // useEffect(() => {
  //   const loadOAuthURL = async () => {
  //     try {
  //       const options = {
  //         method: "GET",
  //         "Content-Type": "application/json",
  //         Accept: "*/*",
  //       };
  //       const fetchresponse = await fetch(`${URL}${GOOGLE_AUTH_URL}`, options);
  //       const { url } = await fetchresponse.json();

  //       setGoogleOAuthURL(url);
  //       console.log(url);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   loadOAuthURL();
  // }, []);

  // ******************PASSWORD
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [loginInfoAuto, setLoginInfoAuto] = useState({
    username: user.username || "admin",
    password: user.password || "admin123*",
  });

  const [loginAuth, setLoginAuth] = useState({
    loginError: false,
    response: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    username: "" || loginInfoAuto.username,
    password: "" || loginInfoAuto.password,
  });

  const handleLoginFormData = (key: string, value: string | File) => {
    setLoginFormData({ ...loginFormData, [key]: value });
  };

  async function handleAddUserFromLogin(e, loginFormData) {
    const form = e.currentTarget;

    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "*" },
        body: JSON.stringify(loginFormData),
      };
      const fetchresponse = await fetch(`${URL}${LOGIN_PATH}`, options);
      const jsonResponse = await fetchresponse.json();
      if (!fetchresponse.ok) {
        setLoginAuth({ ...loginAuth, loginError: true, response: jsonResponse.message });
        console.log(`login error: ${loginAuth.loginError}`);
        console.log(`login response: ${loginAuth.response}`);
        console.log(jsonResponse.message);
        form.reset();
      } else {
        navigate("/admin");
        setToken(jsonResponse.token);
        // console.log({ ...user, message: `Welcome, ${user[0].username}!` });
        console.log(user);
        setLoginAuth({ loginError: false, response: "" });
      }
    } catch (err) {
      console.log(`error in login form data, handleAddUserFromLogin FN>>> ${err}`);
    }

    form.reset();
    setValidated(false);
  }

  return (
    <section className="login">
      <Row>
        <Col
          lg="6"
          md="12"
          className="p-0 m-0"
        >
          <img src={loginimg} />
        </Col>
        <Col
          lg="6"
          md="12"
          className="col-container"
        >
          <div className="login-right-info flex-column d-flex justify-content-center">
            <h1 className="pb-3 text-dark">Welcome to Kuber</h1>
            <p className="fs-6 pb-4 text-muted">
              Need an account?
              <span>
                <button
                  onClick={() => {
                    navigate("/auth/sign-up");
                  }}
                  className="fs-5 text-info btn-none "
                >
                  Sign Up
                </button>
              </span>
            </p>
            <div className="user-login-btn-options py-3 d-flex justify-content-between">
              <button className="btn btn-admin  px-4 py-1">Admin</button>
              <button className="btn btn-employee px-4 py-1"> Employee</button>
              <button className="btn btn-client px-4 py-1">Client</button>
            </div>

            <Form
              noValidate
              validated={validated}
              onSubmit={(e) => handleAddUserFromLogin(e, loginFormData)}
            >
              {loginAuth.loginError && <p className="text-danger fw-bold">{loginAuth.response}</p>}
              <Form.Label
                className="fs-2 fw-medium text-dark"
                htmlFor="Sign in form"
              >
                Log In
              </Form.Label>
              <Form.Group>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input mt-3"
                    name="username"
                    type="text"
                    placeholder="Username*"
                    required
                    onChange={(e) => handleLoginFormData("username", e.target.value)}
                    defaultValue={loginInfoAuto.username}
                  />
                  <span className="form-control-container-icon_end">
                    <i className="fa-regular fa-circle-user"></i>
                  </span>
                </div>

                <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <div className="form-control-container ">
                  <Form.Control
                    className="form-control-container-input mt-3"
                    name="password"
                    type={passwordToggle ? "text" : "password"}
                    placeholder="Password*"
                    minLength={8}
                    required
                    onChange={(e) => handleLoginFormData("password", e.target.value)}
                    defaultValue={loginInfoAuto.password}
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
                    )}
                  </span>
                </div>
                <Form.Control.Feedback type="invalid">Please enter a valid password.</Form.Control.Feedback>
                <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex pt-3">
                <FormCheckInput />
                <a
                  className="flex-grow-1 ps-2 auth-links"
                  href="#"
                >
                  Remember Me
                </a>
                <a
                  className="text-primary auth-links"
                  href="/forgot-password"
                >
                  Forgot Password?
                </a>
              </div>
              <br />
              <button
                className="btn btn-login w-100 mt-5 py-3 login-btn"
                type="submit"
              >
                Log In
              </button>
              <p className="fw-medium text-center login-socials">OR</p>
              <div className="text-center">
                <button
                  className="btn-none"
                  onClick={() => {
                    window.location.href = googleOAuthURL;
                  }}
                  disabled={!googleOAuthURL}
                >
                  <i className="fa-brands fa-google text-muted"></i>
                </button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default LoginPage;
