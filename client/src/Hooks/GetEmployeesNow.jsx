import React from "react";
import { useEffect, useState } from "react";
const URL = "http://localhost:8080";

const GetEmployeesNow = () => {
  const [employees, setEmployees] = useState([]);

  // get employees
  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((json) => setEmployees(json));
  }, []);

  return employees;
};

export default GetEmployeesNow;
