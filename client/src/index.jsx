import React, { useEffect, useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../src/styles/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Routes/Root";
import ErrorPage from "./Components/Errors/ErrorPage";
import ProjectsDash from "./Components/Dashboard/ProjectsDash";
import AddEmployee from "./Components/Employees/AddEmployee";
import AllEmployees from "./Components/Employees/AllEmployees";
import AddProject from "./Components/Projects/AddProject";
import AllProjects from "./Components/Projects/AllProjects";
import { getEmployees } from "./Hooks/getResources";
import { getProjects } from "./Hooks/getResources";

export const CustomContext = createContext();

const Index = () => {
  // URL
  // const URL = "http://localhost:8080/";
  const URL = "https://employee-management-app-rho.vercel.app/";

  const EMPLOYEE_PATH = "employees";
  const ADDEMPLOYEE_PATH = "add-employee";
  const ALLPROJECTS_PATH = "all-projects";

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
      console.log(`Something went wrong with fetch from server ${response.status} `);
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
    console.log(err.status);
    console.log(`FETCH FAILED: ${err}`);
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
      element: <Root URL={URL} />,
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
          path: "/all-employees",
          element: (
            <AllEmployees
              URL={URL}
              EMPLOYEE_PATH={EMPLOYEE_PATH}
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
          path: "/add-employee",
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
          path: "/all-projects",
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
          path: "/add-projects",
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
          path: "/dashboard",
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
    AddEmployeeTitle: ADDEMPLOYEE_PATH,
    AllEmployeesTitle: EMPLOYEE_PATH,
    AllProjectsTitle: ALLPROJECTS_PATH,
    loading,
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
