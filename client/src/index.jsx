import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../src/styles/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from "./Components/Employees/AddEmployee";
import AllEmployees from "./Components/Employees/AllEmployees";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddProject from "./Components/Projects/AddProject";
import AllProjects from "./Components/Projects/AllProjects";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        ></Route>
        <Route
          path="/add-employee"
          element={<AddEmployee />}
        ></Route>
        <Route
          path="/all-employees"
          element={<AllEmployees />}
        ></Route>
        <Route
          path="/add-project"
          element={<AddProject />}
        ></Route>
        <Route
          path="/all-projects"
          element={<AllProjects />}
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
