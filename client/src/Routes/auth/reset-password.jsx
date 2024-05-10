import { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import { useToken } from "../../Hooks/useToken";
import { useUser } from "../../Hooks/useUser";
const loginimg = require("../../images/login.png");

const ResetPasswordPage = () => {
  // interface FormDataInterface {
  //   username: string;
  //   password: string;
  // }
  const URL = "http://localhost:8080/auth/";
  const FORGOT_PASSWORD_PATH = "forgot-password/:";
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);

  // ******************PASSWORD

  const [forgotPasswordAuth, setforgotPasswordAuth] = useState({
    forgotPassworError: false,
    response: "",
  });

  const [forgotPasswordFormData, setforgotPasswordFormData] = useState({
    email: "",
  });

  const handleforgotPasswordFormData = (key, value) => {
    setforgotPasswordFormData({ ...forgotPasswordFormData, [key]: value });
  };

  async function handleAddUserPasswordResetLink(e, forgotPasswordFormData) {
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
      };
      const fetchresponse = await fetch(`${URL}${FORGOT_PASSWORD_PATH}${forgotPasswordFormData.email}`, options);
      const jsonResponse = await fetchresponse.json();
      if (!fetchresponse.ok) {
        setforgotPasswordAuth({ ...forgotPasswordAuth, forgotPassworError: true, response: jsonResponse.message });
        console.log(`forgot password error: ${forgotPasswordAuth.forgotPassworError}`);
        console.log(`forgot password response: ${forgotPasswordAuth.response}`);
        console.log(jsonResponse.message);
      } else {
        setSuccess(true);
        setforgotPasswordAuth({ forgotPassworError: false, response: "" });
      }
    } catch (err) {
      console.log(err);
    }

    form.reset();
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
              <h1 className="pb-3 text-dark">Password Reset email sent</h1>
              <p className="fs-6 pb-4 text-muted">
                An email has been sent to your email address {forgotPasswordFormData.email}. Follow the reset link to
                reset your passwod.
              </p>
            </div>
          ) : (
            <div className="login-right-info flex-column d-flex justify-content-center">
              <Form.Label
                className="fs-2 fw-medium text-dark"
                htmlFor="forgot password"
              >
                Please your email to reset your password.
              </Form.Label>

              <p className="fs-6 pb-4 text-muted">A reset link will be sent to the email that you provide below.</p>

              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => handleAddUserPasswordResetLink(e, forgotPasswordFormData)}
                className="pt-3"
              >
                {forgotPasswordAuth.forgotPassworError && (
                  <p className="text-danger fw-bold">{forgotPasswordAuth.response}</p>
                )}

                <Form.Group>
                  <div className="form-control-container ">
                    <Form.Control
                      className="form-control-container-input mt-3"
                      name="email"
                      type="text"
                      placeholder="email*"
                      required
                      onChange={(e) => handleforgotPasswordFormData("email", e.target.value)}
                    />
                    <span className="form-control-container-icon_end">
                      <i className="fa-regular fa-envelope"></i>{" "}
                    </span>
                  </div>

                  <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
                  <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
                </Form.Group>

                <br />
                {forgotPasswordAuth.forgotPassworError && <div>{forgotPasswordAuth.response}</div>}
                <button
                  className="btn btn-login w-100 mt-5 py-3 login-btn"
                  type="submit"
                  disabled={!forgotPasswordFormData.email}
                >
                  Send reset link
                </button>
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default ResetPasswordPage;
