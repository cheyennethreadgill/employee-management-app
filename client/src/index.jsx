import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../src/styles/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddEmployee from "./Components/Employees/AddEmployee";
import AllEmployees from "./Components/Employees/AllEmployees";
import App from "./Routes/App";
import AddProject from "./Components/Projects/AddProject";
import AllProjects from "./Components/Projects/AllProjects";
import ErrorPage from "./Components/Errors/ErrorPage";
import ProjectsDash from "./Components/Dashboard/ProjectsDash";

// Form Select & Radios
const workStatusOptions = ["active", "completed", "running", "pending", "not started", "canceled"];
const priorityOptions = ["high", "medium", "low"];
const teamOptions = ["Sarah", "Michelle", "Kelly"];
const departmentOptions = ["development", "designing", "testing", "hr"];

// const URL = "http://localhost:8080/";
const URL = "https://employee-management-app-rho.vercel.app/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App URL={URL} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/all-employees",
        element: <AllEmployees URL={URL} />,
      },
      {
        path: "/add-employee",
        element: (
          <AddEmployee
            URL={URL}
            departmentOptions={departmentOptions}
          />
        ),
      },
      {
        path: "/all-projects",
        element: (
          <AllProjects
            URL={URL}
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
