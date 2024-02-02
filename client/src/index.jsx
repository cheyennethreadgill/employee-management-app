import React, { useState, useEffect, useRef } from "react";
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

// const handleFormValidation = (e) => {
//   if (e.includes("a")) {
//     console.log("fix");
//   } else {
//     console.log("done");
// }
// if (!e.target.value == "") {
//   if (typeof e.target.value !== "number") {
//     console.log("Must contain numbers");
//     console.log(`ERROR: ${typeof e.target.value}`);
//   }
//   if (typeof e.target.value == "number") {
//     console.log("checked");
//     console.log(`Type After Check: ${typeof e.target.value}`);
//   } else {
//     console.log("Done");
//   }
// } else {
//   console.log("Must enter something");
// }
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/all-employees",
        element: <AllEmployees />,
      },
      {
        path: "/add-employee",
        element: <AddEmployee />,
      },
      {
        path: "/all-projects",
        element: <AllProjects />,
      },
      {
        path: "/add-projects",
        element: <AddProject />,
      },
      {
        path: "/dashboard",
        element: <ProjectsDash />,
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
