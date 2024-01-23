import Navigation from "../Global/Nav";
import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";

const AddEmployee = () => {
  const URL = "https://employee-management-app-eight.vercel.app/";
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
  async function addEmployeeNow(e) {
    e.preventDefault();
    // Post options
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
  }

  return (
    <>
      <Container>
        <PageHeaders name={PATH} />
        <Form
          onSubmit={addEmployeeNow}
          autoComplete="true"
        >
          <Row>
            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="first name *"
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                required={true}
              />
            </Col>
            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="last name"
                onChange={(e) => {
                  setLname(e.target.value);
                }}
              />
            </Col>

            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
            </Col>

            <Col lg="6">
              <Form.Control
                type="tel"
                placeholder="mobile*"
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                required={true}
              />
            </Col>

            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="password*"
                required={true}
              />
            </Col>

            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="re-enter password*"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required={true}
              />
            </Col>

            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="designmation"
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              />
            </Col>

            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="department"
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
              />
            </Col>

            <Col lg="12">
              <Form.Control
                type="text"
                placeholder="address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </Col>

            <Col lg="6">
              <Form.Control
                type="text"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Col>

            <Col lg="6">
              <Form.Control
                name="date"
                type="date"
                placeholder="date of birth"
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
              />
            </Col>

            <Col lg="12">
              <Form.Control
                type="text"
                placeholder="Degree"
                onChange={(e) => {
                  setDegree(e.target.value);
                }}
              />
            </Col>

            <fieldset>
              <legend>Upload Image</legend>
              <Form.Control type="file" />
              <Button type="submit">Submit</Button>
              <Button type="button">Cancel</Button>
            </fieldset>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default AddEmployee;
