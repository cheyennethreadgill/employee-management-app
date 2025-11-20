import { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { useToken } from "../../Hooks/useToken";
import { useUser } from "../../Hooks/useUser";
const loginimg = ("../../images/login.png");

const PasswordResetLandingPage = ({ URL }) => {
  // interface FormDataInterface {
  //   username: string;
  //   password: string;
  // }
  // const URL = "http://localhost:8080/auth/";
  const RESETPASSWORD_URL = "auth/reset-password";
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate();

  // ******************PASSWORD

  const [resetPasswordAuth, setResetPasswordAuth] = useState({
    resetPassworError: false,
    response: "",
  });
  const [passwordToggle, setPasswordToggle] = useState(false);

  // lets request url know which part of it is considered params
  const { passwordResetCode } = useParams();

  async function handleResetPassword(e, password) {
    const form = e.currentTarget;

    e.preventDefault();
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: password }),
      };

      await fetch(`http://localhost:8080/auth/reset-password/${passwordResetCode}`, options);
      // const jsonResponse = await fetchresponse.json();

      // if (!fetchresponse.ok) {
      //   setResetPasswordAuth({ resetPassworError: true, response: jsonResponse.message });
      //   console.log(`forgot password error: ${resetPasswordAuth.resetPassworError}`);
      //   console.log(`forgot password response: ${resetPasswordAuth.response}`);
      //   setSuccess(false);
      // }
      setResetPasswordAuth({ resetPassworError: false, response: "" });
      setSuccess(true);
      setTimeout(() => {
        navigate("/auth/login");
      }, 5000);

      form.reset();
    } catch (err) {
      console.log(err);
    }

    setValidated(false);
  }

  return (
    <section className="login">
      <Row>
        <Col
          lg="6"
          className="p-0 m-0"
        >
          <img src={loginimg} />
        </Col>
        <Col
          lg="6"
          className="col-container"
        >
          {success ? (
            <div className="login-right-info flex-column d-flex justify-content-center">
              <h1 className="pb-3 text-dark">Password reset successful! Redirecting...</h1>
            </div>
          ) : (
            // else
            <div className="login-right-info flex-column d-flex justify-content-center">
              <Form.Label
                className="fs-2 fw-medium text-dark"
                htmlFor="forgot password"
              >
                Reset Password
              </Form.Label>

              <p className="fs-6 pb-4 text-muted">Please reset password below.</p>

              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => handleResetPassword(e, password)}
                className="pt-3"
              >
                {resetPasswordAuth.resetPassworError && (
                  <p className="text-danger fw-bold">
                    {typeof resetPasswordAuth.response === "object"
                      ? JSON.stringify(resetPasswordAuth.response)
                      : resetPasswordAuth.response}
                  </p>
                )}

                <Form.Group>
                  <div className="form-control-container ">
                    <Form.Control
                      className="form-control-container-input mt-3"
                      name="password"
                      type={passwordToggle ? "text" : "password"}
                      placeholder="Password*"
                      minLength={8}
                      required
                      onChange={(e) => setPassword(e.target.value)}
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

                <Form.Group>
                  <div className="form-control-container ">
                    <Form.Control
                      className="form-control-container-input mt-3"
                      name="confirm password"
                      type={passwordToggle ? "text" : "password"}
                      placeholder="Password*"
                      minLength={8}
                      required
                      onChange={(e) => setConfirmedPassword(e.target.value)}
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

                <br />

                <button
                  className="btn btn-login w-100 mt-5 py-3 login-btn"
                  type="submit"
                  disabled={!password || !confirmedPassword || password !== confirmedPassword}
                >
                  Reset Password
                </button>
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default PasswordResetLandingPage;
