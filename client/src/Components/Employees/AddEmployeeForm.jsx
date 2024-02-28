import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import { CustomContext } from "./AddEmployee";
import { toSentenceCase } from "../../Helpers/strings";

import InputErrorComponent from "../Employees/InputErrorComponent";

const AddEmployeeForm = () => {
  const contextValue = useContext(CustomContext);
  let validated = contextValue.validated;

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={(e) => {
        contextValue.handleSubmit(e, e.currentTarget);
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
              contextValue.handleEmployeeFormData("fname", toSentenceCase(e.target.value));
            }}
            required
            maxLength={45}
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
              contextValue.handleEmployeeFormData("lname", toSentenceCase(e.target.value));
            }}
            required
            maxLength={45}
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
              contextValue.handleEmployeeFormData("gender", toSentenceCase(e.target.value));
            }}
            maxLength={45}
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
              contextValue.handleEmployeeFormData("mobile", toSentenceCase(e.target.value));
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
              contextValue.handleEmployeeFormData("password", toSentenceCase(e.target.value));
              contextValue.handlePasswordValidation(e.target.value);
              contextValue.handlePasswordMatchCheck(e.target.value);
            }}
            required
            minLength={6}
            maxLength={30}
            autoComplete="current-password"
          />
          <Form.Control.Feedback type="invalid">Password must be at least 6 characters.</Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          {contextValue.inputErrors.password && (
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
              contextValue.handleEmployeeFormData("designation", toSentenceCase(e.target.value));
            }}
            required
            maxLength={45}
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
                contextValue.handleEmployeeFormData("department", toSentenceCase(e.target.value));
              }}
              required
              maxLength={45}
            >
              {contextValue.departmentOptions.map((option) => {
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
              contextValue.handleEmployeeFormData("address", toSentenceCase(e.target.value));
            }}
            required
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
              let val = e.target.value;
              contextValue.handleEmployeeFormData("email", toSentenceCase(e.target.value));
              contextValue.handleEmailCheck(val, contextValue.handleInputErrors);
            }}
            required
            maxLength={45}
          />
          {/* <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          {contextValue.inputErrors.email && (
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
              contextValue.handleEmployeeFormData("dateofbirth", toSentenceCase(e.target.value));
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
              contextValue.handleEmployeeFormData("degree", toSentenceCase(e.target.value));
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
              contextValue.handleEmployeeFormData("image", e.target.files[0]);
              let name = e.target.files[0].name;
              contextValue.handleFileTypeCheck(name, contextValue.contextValue.handleInputErrors);
            }}
          />
          {contextValue.inputErrors.fileType && (
            <InputErrorComponent
              errorType="fileType"
              errorPContent="Please give valid filetype. File Types accepted: .jpg, .png, .jpeg"
            />
          )}
        </fieldset>
        {contextValue.formSubmitted && <p className="fw-medium mt-2">Employee Added Successfully!</p>}
        {contextValue.error && !contextValue.formSubmitted && (
          <p className="text-danger fw-bold mt-2">Please correct errors above.</p>
        )}
        {contextValue.error && contextValue.formSubmitted && (
          <p className="text-danger fw-bold mt-2">Please correct errors above.</p>
        )}
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
  );
};

export default AddEmployeeForm;
