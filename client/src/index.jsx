import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../src/styles/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddEmployee from "./Components/Employees/AddEmployee";
import AllEmployees from "./Components/Employees/AllEmployees";
import Root from "./Routes/Root";
import AddProject from "./Components/Projects/AddProject";
import AllProjects from "./Components/Projects/AllProjects";
import ErrorPage from "./Components/Errors/ErrorPage";
import ProjectsDash from "./Components/Dashboard/ProjectsDash";

// URL
const URL = "http://localhost:8080/";
// const URL = "https://employee-management-app-rho.vercel.app/";

// Form Select & Radios
const workStatusOptions = ["active", "completed", "running", "pending", "not started", "canceled"];
const priorityOptions = ["high", "medium", "low"];
const teamOptions = ["Sarah", "Michelle", "Kelly"];
const departmentOptions = ["development", "designing", "testing", "hr"];

// ERROR HANDLING
const handleFetchPromiseError = (response) => {
  if (!response.ok) {
    console.log(`Something went wrong with fetch from server ${response.status}`);
  }
};
const handleJsonPromiseResponseLog = (response) => {
  response.then((res) => {
    console.log(res);
  });
};
const handleFetchError = (err) => {
  console.log(`FETCH FAILED: ${err}`);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root URL={URL} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/all-employees",
        element: (
          <AllEmployees
            URL={URL}
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
        path: "/add-projects",
        element: (
          <AddProject
            URL={URL}
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
        element: <ProjectsDash URL={URL} />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
