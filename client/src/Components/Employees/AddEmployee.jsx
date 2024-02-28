import React, { useState, createContext } from "react";
import { Container } from "react-bootstrap";
import PageHeaders from "../Global/PageHeaders";
import { handlePasswordValidation } from "../../private/passwordValidation";
import { handleFileTypeCheck } from "../../Helpers/formValidation";
import { handleEmailCheck } from "../../Helpers/formValidation";
import AddEmployeeForm from "./AddEmployeeForm";

export const CustomContext = createContext();

const AddEmployee = ({
  URL,
  departmentOptions,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchError,
}) => {
  // const PATH = "add-employee";
  const [validated, setValidated] = useState(false);
  const [error, setFormError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    fileType: false,
    email: false,
    password: false,
  });

  // ****************************************************************INPUT CHECKS BEFORE VALIDATION
  const handleInputErrors = (key, value) => {
    setInputErrors({ ...inputErrors, [key]: value });
  };

  // ****************************************************INPUT CHECKS Components

  function handlePasswordMatchCheck(e) {
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
  }
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

  // ****************************************************Context Values
  const contextValues = {
    pageTitle: "add-employee",
    validated,
    handleInputErrors,
    inputErrors,
    error,
    formSubmitted,
    departmentOptions,
    handleSubmit,
    handleEmailCheck,
    handleEmployeeFormData,
    handlePasswordValidation,
    handlePasswordMatchCheck,
    handleFileTypeCheck,
  };

  return (
    <Container>
      <CustomContext.Provider value={contextValues}>
        <PageHeaders />
        <AddEmployeeForm />
      </CustomContext.Provider>
    </Container>
  );
};

export default AddEmployee;
