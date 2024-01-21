import React, { useState, useEffect } from "react";
import Navigation from "../Global/Nav";
import { Button, Container, Form } from "react-bootstrap";

const AddEmployee = () => {
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
  const URL = "http://localhost:8080";

  // ADD EMPLOYEE TO DB
  async function addEmployeeNow(e) {
    e.preventDefault();
    // Post options
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      const fetchPromiseResponse = await fetch(`${URL}/add-employee`, options);
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
      <Navigation />
      <Container>
        <Form
          onSubmit={addEmployeeNow}
          autoComplete="true"
        >
          <legend className="add employee">ADD EMPLOYEE</legend>
          <Form.Control
            type="text"
            placeholder="first name *"
            onChange={(e) => {
              setFname(e.target.value);
            }}
            required={true}
          />
          <Form.Control
            type="text"
            placeholder="last name"
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />

          <Form.Control
            type="text"
            placeholder="gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          />

          <Form.Control
            type="tel"
            placeholder="mobile*"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            required={true}
          />
          <Form.Control
            type="text"
            placeholder="password*"
            required={true}
          />
          <Form.Control
            type="text"
            placeholder="re-enter password*"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required={true}
          />
          <Form.Control
            type="text"
            placeholder="designmation"
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
          />
          <br />
          <br />

          <br />
          <br />
          <Form.Control
            type="text"
            placeholder="address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <Form.Control
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label
            htmlFor="date"
            className="mt-4"
          >
            DOB
          </label>
          <Form.Control
            name="date"
            type="date"
            placeholder="date of birth"
            onChange={(e) => {
              setDOB(e.target.value);
            }}
            className="mt-0"
          />

          <Form.Control
            type="text"
            placeholder="Degree"
            onChange={(e) => {
              setDegree(e.target.value);
            }}
          />
          <fieldset>
            <legend>Upload Image</legend>
            <Form.Control type="file" />
            <Button type="submit">Submit</Button>
            <Button type="button">Cancel</Button>
          </fieldset>
        </Form>
      </Container>
    </>
  );
};

export default AddEmployee;
