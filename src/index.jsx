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
import { getEmployees, getProjects } from "./Hooks/getResources";
import LoginPage from "./Routes/auth/LoginPage";
import SignUpPage from "./Routes/auth/SignUpPage";
import ForgotPasswordPage from "./Routes/auth/forgot.password";
import PasswordResetLandingPage from "./Routes/auth/PasswordResetLandingPage";
// import SuccessPage from "../../server/views/successPage";

export const CustomContext = createContext(null);

const Index = () => {
  // URL
  const URL = "https://employee-management-app-rho.vercel.app/"; // use when in production

  const EMPLOYEES_API_PATH = "api/employees";
  const ADDEMPLOYEE_PATH = "admin/add-employee";
  const ALLPROJECTS_PATH = "api/all-projects";
  const UPDATE_PATH = "update-employee";
  const ADDPROJECT_PATH = "add-project";

  // Form Select & Radios
  const workStatusOptions = ["active", "completed", "running", "pending", "not started", "canceled"];
  const priorityOptions = ["", "high", "medium", "low"];
  const teamOptions = ["", "Sarah", "Michelle", "Kelly"];
  const departmentOptions = ["", "development", "designing", "testing", "hr"];

  const [deleteNotif, setDeleteNotif] = useState(false);
  // **********************************************************************loading states

  const [loading, setLoading] = useState(true);
  const handleLoadingState = (value) => setLoading(value);

  // *********************************************************************ERROR HANDLING
  const handleFetchPromiseError = (response) => {
    if (!response.ok) {
      return response;
    }
  };
  const [formError, setFormError] = useState(false);

  // set respionse message
  const [responseMessage, setResponseMessage] = useState("");

  // response log
  const handleJsonPromiseResponseLog = (res, json) => {
    if (!res.ok) {
      if (json) {
        setFormError(true);
      }
      setResponseMessage(res.message);
      return ServerErrorComponent();
    } else {
      setFormError(false);
      console.log(res.token);
    }
  };
  // fetch error
  const handleFetchError = (err) => {
    console.log(`FETCH FAILED: ${err}`);
  };

  // *************************************************************************Resources

  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const handleSetEmployees = (data) => setEmployees(data);
  const handleSetProjects = (data) => setProjects(data);

  // get Employees then populate app state with employees
  useEffect(() => {
    async function go() {
      getEmployees(
        employees,
        URL,
        EMPLOYEES_API_PATH,
        handleLoadingState,
        handleSetEmployees,
        handleFetchPromiseError,
        handleJsonPromiseResponseLog,
        handleFetchError
      );
    }
    go();
  }, []);

  // // get Projects
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
    // <PrivateRoute
    //       path="/admin"
    //       component={<App />}
    //       isAuthenticated={isAuthenticated()}
    //     />
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
    {
      path: "/auth/reset-password/:passwordResetCode",
      element: <PasswordResetLandingPage URL={URL} />,
    },
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
              EMPLOYEES_API_PATH={EMPLOYEES_API_PATH}
              UPDATE_PATH={UPDATE_PATH}
              handleLoadingState={handleLoadingState}
              loading={loading}
              setDeleteNotif={setDeleteNotif}
              deleteNotif={deleteNotif}
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
              setDeleteNotif={setDeleteNotif}
              deleteNotif={deleteNotif}
              handleSetProjects={handleSetProjects}
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
    EMPLOYEES_API_PATH,
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

// injected into index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Index />
  // </React.StrictMode>
);
