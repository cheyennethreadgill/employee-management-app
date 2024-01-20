const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 8080;
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Cheyenne1234",
  database: "employee-management",
});

db.connect();

app.get("/employees", (req, res) => {
  (err) => {
    console.log(err);
  };

  let sql = "SELECT * FROM employees";

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else res.json(result);
  });
});
app.get("/projects", (req, res) => {
  (err) => {
    console.log(err);
  };

  let sql = "SELECT * FROM projects";

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else res.json(result);
  });
});

// **********************************************POST
// ADD EMPLOYEE
app.post("/add-employee", (req, res) => {
  console.log(req.body);
  let fname = req.body.fname;
  let lname = req.body.lname;
  let gender = req.body.gender;
  let mobile = req.body.mobile;
  let password = req.body.password;
  let designation = req.body.designation;
  let department = req.body.department;
  let address = req.body.address;
  let email = req.body.email;
  let dateofbirth = req.body.dateofbirth;
  let degree = req.body.degree;
  let image = req.body.image;

  let sql = `INSERT into employees (firstname, lastname, gender, mobile, password, designation, department, address, email, dateofbirth, degree, image) VALUES (?)`;
  let values = [
    fname,
    lname,
    gender,
    mobile,
    password,
    designation,
    department,
    address,
    email,
    dateofbirth,
    degree,
    image,
  ];

  db.query(sql, [values], (err) => {
    if (err) {
      throw err;
    } else {
      res.json({
        status: "success",
        message: "Employee added successfully.",
        employee: req.body,
      });
    }
  });
});

// ADD PROJECT
app.post("/add-project", (req, res) => {
  console.log(req.body);
  let title = req.body.title;
  let department = req.body.department;
  let priority = req.body.priority;
  let client = req.body.client;
  let price = req.body.price;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let team = req.body.team;
  let status = req.body.status;
  let description = req.body.description;

  let sql = `INSERT into projects (title, department, priority, client, price, startDate, endDate, team, status, description) VALUES (?)`;
  let values = [
    title,
    department,
    priority,
    client,
    price,
    startDate,
    endDate,
    team,
    status,
    description,
  ];

  db.query(sql, [values], (err) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        status: "success",
        message: "Project added successfully.",
        project: req.body,
      });
    }
  });
});

// *****************************************UPDATES
// UPDATE EMPLOYEE
app.put("/update-employee", (req, res) => {
  console.log(req.body);

  let sql = `UPDATE employees SET firstname = '${req.body.fname}', lastname = '${req.body.lname}', mobile = '${req.body.mobile}', designation = '${req.body.designation}', department = '${req.body.department}', email = '${req.body.email}' WHERE employeeid = '${req.body.employeeid}'`;

  db.query(sql, (err) => {
    if (err) {
      throw err;
    } else {
      res.json({
        status: "success",
        message: "Employee updated successfully.",
        employee: req.body,
      });
    }
  });
});
// *****************************************DELETE
app.delete("/delete-employee/:id", (req, res) => {
  let sql = `DELETE FROM employees WHERE employeeid = (?)`;

  let vals = [req.params.id];

  db.query(sql, [vals], (err, res) => {
    if (err) {
      throw err;
    }
  });
  res.json("Employee deleted.");
});

app.listen(PORT, () => {
  console.log("Server running on port 8080");
});
