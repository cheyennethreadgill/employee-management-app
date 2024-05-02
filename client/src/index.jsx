import ReactDOM from "react-dom/client";
import React, { useEffect, useState, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../src/styles/styles.css";
import ErrorPage from "./Components/Errors/ErrorPage";
import ProjectsDash from "./Components/Dashboard/ProjectsDash";
import AddEmployee from "./Components/Employees/AddEmployee";
import AllEmployees from "./Components/Employees/AllEmployees";
import AddProject from "./Components/Projects/AddProject";
import AllProjects from "./Components/Projects/AllProjects";
import { getEmployees } from "./Hooks/getResources";
import { getProjects } from "./Hooks/getResources";
import LoginPage from "./Routes/auth/LoginPage";
import SignUpPage from "./Routes/auth/SignUpPage";
import ForgotPasswordPage from "./Routes/auth/forgot.password";
// import SuccessPage from "../../server/views/successPage";

export const CustomContext = createContext();

const Index = () => {
  // URL
  const URL = "http://localhost:8080/";
  // const URL = "https://employee-management-app-rho.vercel.app/";

  const EMPLOYEE_PATH = "admin/employees";
  const ADDEMPLOYEE_PATH = "admin/add-employee";
  const ALLPROJECTS_PATH = "all-projects";
  const UPDATE_PATH = "update-employee";
  const ADDPROJECT_PATH = "add-project";

  // Form Select & Radios
  const workStatusOptions = ["active", "completed", "running", "pending", "not started", "canceled"];
  const priorityOptions = ["", "high", "medium", "low"];
  const teamOptions = ["", "Sarah", "Michelle", "Kelly"];
  const departmentOptions = ["", "development", "designing", "testing", "hr"];

  // **********************************************************************loading states

  const [loading, setLoading] = useState(true);
  const handleLoadingState = (value) => setLoading(value);

  // *********************************************************************ERROR HANDLING
  const handleFetchPromiseError = (response) => {
    if (!response.ok) {
      console.log(`Something went wrong with fetch from server ${response.message} `);
    }
  };

  // set respionse message
  const [responseMessage, setResponseMessage] = useState("");

  // response log
  const handleJsonPromiseResponseLog = (res, setFormError) => {
    if (!res.ok) {
      let message = res.message;
      if (setFormError) {
        setFormError(true);
      }
      setResponseMessage(message);
      return ServerErrorComponent();
    } else {
      setFormError(false);
      console.log(res);
    }
  };
  // fetch error
  const handleFetchError = (err) => {
    if (err) {
      console.log(`FETCH FAILED: ${err.status}`);
    } else {
      return;
    }
  };

  // *************************************************************************Resources
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const handleSetEmployees = (data) => setEmployees(data);
  const handleSetProjects = (data) => setProjects(data);

  // get Employees
  useEffect(
    () =>
      getEmployees(
        employees,
        URL,
        EMPLOYEE_PATH,
        handleLoadingState,
        handleSetEmployees,
        handleFetchPromiseError,
        handleJsonPromiseResponseLog,
        handleFetchError
      ),
    []
  );

  // get Projects
  useEffect(() => {
    getProjects(
      URL,
      ALLPROJECTS_PATH,
      handleSetProjects,
      handleLoadingState,
      handleFetchPromiseError,
      handleJsonPromiseResponseLog,
      handleFetchError
    );
  }, []);

  // server error component
  function ServerErrorComponent() {
    return <p className="text-danger"> {responseMessage} </p>;
  }

  // Routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage URL={URL} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage URL={URL} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth/login",
      element: <LoginPage URL={URL} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth/sign-up",
      element: <SignUpPage URL={URL} />,
    },
    // {
    //   path: "/sign-up/success",
    //   element: <SuccessPage />,
    // },
    {
      path: "/admin",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <ProjectsDash
              URL={URL}
              projects={projects}
              handleSetProjects={handleSetProjects}
              handleLoadingState={handleLoadingState}
              handleFetchPromiseError={handleFetchPromiseError}
              handleJsonPromiseResponseLog={handleJsonPromiseResponseLog}
              handleFetchError={handleFetchError}
            />
          ),
        },
        {
          path: "/admin/all-employees",
          element: (
            <AllEmployees
              URL={URL}
              EMPLOYEE_PATH={EMPLOYEE_PATH}
              UPDATE_PATH={UPDATE_PATH}
              handleLoadingState={handleLoadingState}
              loading={loading}
              employees={employees}
              handleSetEmployees={handleSetEmployees}
              handleFetchPromiseError={handleFetchPromiseError}
              handleJsonPromiseResponseLog={handleJsonPromiseResponseLog}
              handleFetchError={handleFetchError}
            />
          ),
        },
        {
          path: "/admin/add-employee",
          element: (
            <AddEmployee
              URL={URL}
              ADDEMPLOYEE_PATH={ADDEMPLOYEE_PATH}
              employees={employees}
              handleFetchPromiseError={handleFetchPromiseError}
              handleJsonPromiseResponseLog={handleJsonPromiseResponseLog}
              handleFetchError={handleFetchError}
              departmentOptions={departmentOptions}
            />
          ),
        },
        {
          path: "/admin/all-projects",
          element: (
            <AllProjects
              URL={URL}
              projects={projects}
              handleSetProjects={handleSetProjects}
              ALLPROJECTS_PATH={ALLPROJECTS_PATH}
              workStatusOptions={workStatusOptions}
              priorityOptions={priorityOptions}
              teamOptions={teamOptions}
              departmentOptions={departmentOptions}
              handleFetchPromiseError={handleFetchPromiseError}
              handleJsonPromiseResponseLog={handleJsonPromiseResponseLog}
              handleFetchError={handleFetchError}
            />
          ),
        },
        {
          path: "/admin/add-projects",
          element: (
            <AddProject
              URL={URL}
              projects={projects}
              handleSetProjects={handleSetProjects}
              handleLoadingState={handleLoadingState}
              ALLPROJECTS_PATH={ALLPROJECTS_PATH}
              ServerErrorComponent={ServerErrorComponent}
              handleFetchPromiseError={handleFetchPromiseError}
              handleJsonPromiseResponseLog={handleJsonPromiseResponseLog}
              handleFetchError={handleFetchError}
              workStatusOptions={workStatusOptions}
              priorityOptions={priorityOptions}
              teamOptions={teamOptions}
              departmentOptions={departmentOptions}
            />
          ),
        },
        {
          path: "/admin/dashboard",
          element: (
            <ProjectsDash
              URL={URL}
              projects={projects}
              handleSetProjects={handleSetProjects}
              handleLoadingState={handleLoadingState}
              handleFetchPromiseError={handleFetchPromiseError}
              handleJsonPromiseResponseLog={handleJsonPromiseResponseLog}
              handleFetchError={handleFetchError}
            />
          ),
        },
      ],
    },
  ]);

  const contextValues = {
    ADDEMPLOYEE_PATH,
    EMPLOYEE_PATH,
    ALLPROJECTS_PATH,
    ADDPROJECT_PATH,
    loading,
    workStatusOptions,
    priorityOptions,
    teamOptions,
    departmentOptions,
  };

  return (
    <CustomContext.Provider value={contextValues}>
      <RouterProvider router={router} />
    </CustomContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Index />
  // </React.StrictMode>
);
