import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../src/styles/styles.css";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddEmployee from "./Components/Employees/AddEmployee";
import AllEmployees from "./Components/Employees/AllEmployees";
import App from "./Routes/App";
import AddProject from "./Components/Projects/AddProject";
import AllProjects from "./Components/Projects/AllProjects";
import ErrorPage from "./Components/Errors/ErrorPage";

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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
