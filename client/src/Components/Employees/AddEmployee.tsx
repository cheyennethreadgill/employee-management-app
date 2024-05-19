import { useState, createContext } from "react";
import { Container } from "react-bootstrap";
import { handleFileTypeCheck } from "../../Helpers/formValidation";
import { handleEmailCheck } from "../../Helpers/formValidation";
import PageHeaders from "../Global/PageHeaders";
import AddEmployeeForm from "./AddEmployeeForm";
import InputErrorComponent from "./InputErrorComponent";
// import { useToken } from '../../Hooks/useToken';

export const CustomContext = createContext(null);

const AddEmployee = ({
  URL,
  ADDEMPLOYEE_PATH,
  departmentOptions,
  handleFetchPromiseError,
  handleJsonPromiseResponseLog,
  handleFetchError,
}) => {
  const [validated, setValidated] = useState(false);
  const [error, setFormError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    fileType: false,
    email: false,
    password: false,
  });

  // ****************************************************************INPUT CHECKS BEFORE VALIDATION
  const handleInputErrors = (key: string, value: boolean) => {
    setInputErrors({ ...inputErrors, [key]: value });
  };

  // ***********************************************************************************Form Handling
  const [employeeFormData, setEmployeeFormData] = useState({
    fname: "",
    lname: "",
    gender: "",
    mobile: "",
    password: "",
    username: "",
    designation: "",
    department: "",
    address: "",
    email: "",
    dateofbirth: "",
    degree: "",
    image: null,
  });
  const handleEmployeeFormData = (key: string, value: boolean) => {
    setEmployeeFormData({ ...employeeFormData, [key]: value });
  };
  const handleFormSubmissionStatus = () => setFormSubmitted(true);
  // ********************************************************************************HANLDE UPLOAD
  // ADD EMPLOYEE TO DB
  async function addEmployeeNow(e: React.FormEvent<HTMLFormElement>, currentTarget: HTMLFormElement) {
    e.preventDefault();
    // use FormData Api to construct the body in request when handling multiform
    const formData = new FormData();

    for (const key in employeeFormData) {
      formData.append(key, employeeFormData[key]);
    }

    console.log(employeeFormData.image);
    // // Post options
    const options = {
      method: "POST",
      headers: {
        Accept: "*",
      },
      body: formData,
    };
    try {
      console.dir(formData);
      const fetchPromiseResponse = await fetch(`${URL}${ADDEMPLOYEE_PATH}`, options);
      handleFetchPromiseError(fetchPromiseResponse);
      if (!fetchPromiseResponse.ok) {
        console.log(await fetchPromiseResponse.text());
      } else {
        const jsonPromiseResponse = await fetchPromiseResponse.json();
        // if theres an error, set state, udate ui to log response
        handleJsonPromiseResponseLog(jsonPromiseResponse, setFormError, InputErrorComponent);
        console.log(jsonPromiseResponse);
      }
    } catch (err) {
      console.log(`Error in Add employee fetch:`);
      handleFetchError(err);
    }
    currentTarget.reset();
  }
  // get form validation response
  const promise = (e: React.FormEvent<HTMLFormElement>) => {
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
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, currentTarget: HTMLFormElement) {
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
    validated,
    handleInputErrors,
    inputErrors,
    error,
    formSubmitted,
    departmentOptions,
    handleSubmit,
    handleEmailCheck,
    handleEmployeeFormData,
    handleFileTypeCheck,
  };

  return (
    <Container>
      <PageHeaders title="Add Employee" />
      <CustomContext.Provider value={contextValues}>
        <AddEmployeeForm />
      </CustomContext.Provider>
    </Container>
  );
};

export default AddEmployee;
