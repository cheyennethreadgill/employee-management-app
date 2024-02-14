const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const app = express();
const PORT = process.env.PORT || 8080;
const db = mysql.createConnection({
  user: process.env.DBUser,
  host: process.env.DBHost,
  password: process.env.DBPassword,
  database: process.env.DBDatabase,
});
// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "Cheyenne1234",
//   database: "employee-management",
// });
// Configure AWS SDK with environment variables
// const s3 = new aws.S3({
//   accessKeyId: "AKIAYS2NVW4T5SF6VFNI",
//   secretAccessKey: "KCO9g2T/NyoYxLqQp1tX3peXuUyE3gC4kbG3c+qL",
//   region: "us-east-2", // Specify the region where your S3 bucket is located
// });
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Specify the region where your S3 bucket is located
});
// Define storage options for uploaded files
// const storageInfo = multer.diskStorage({
//   // destination: (req, file, cb) => cb(null, "../server/images/"),
//   // destination: (req, file, cb) => cb(null, "./server/images/"),
//   // destination: (req, file, cb) => cb(null, "/server/images/"),
//   destination: (req, file, cb) => {
//     const imagesDirectory = `${process.cwd()}/server/images/`;
//     cb(null, imagesDirectory);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.originalname}`);
//   },
// });

// upload to local folder
// const upload = multer({
//   storage: storageInfo,
//   limits: {
//     fileSize: 1024 * 1024 * 10, // 5MB max file size
//   },
// });

// upload to multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
});

// const uploadParams = {
//   Bucket: process.env.AWS_BUCKET_NAME,
//   Key: function (req, file, cb) {
//     cb(null, file.originalname); // Use current timestamp as the key
//   },
// };

app.use(cors());
app.use(
  bodyParser.json({
    limit: 10000000,
  })
);
app.use(bodyParser.urlencoded({ extended: true, limit: 10000000 }));

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
app.post("/add-employee", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

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
  let image = req.file.originalname || " ";

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
        file: req.file,
      });
    }
  });

  console.log(`IMAGE: ${values[11]}`);
});

// ADD PROJECT
app.post("/add-project", (req, res) => {
  console.log(req.body);
  let title = req.body.title;
  let projectID = req.body.projectID;
  let department = req.body.department;
  let priority = req.body.priority;
  let client = req.body.client;
  let price = req.body.price;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let team = req.body.team;
  let status = req.body.status;
  let description = req.body.description;

  let sql = `INSERT into projects (title, projectID, department, priority, client, price, startDate, endDate, team, status, description) VALUES (?)`;
  let values = [title, projectID, department, priority, client, price, startDate, endDate, team, status, description];

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
app.put("/update-employee", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  let sql = `UPDATE employees SET firstname = '${req.body.fname}', degree = '${req.body.degree}', lastname = '${
    req.body.lname
  }', mobile = '${req.body.mobile}', designation = '${req.body.designation}', department = '${
    req.body.department
  }', email = '${req.body.email}', image = '${req.body.image || req.file.originalname} ' WHERE employeeid = '${
    req.body.employeeid
  }'`;
  // Generate a unique key based on the file's original name
  function generateKey(req, file, cb) {
    const origname = file.originalname;
    cb(null, `${origname}`); // Use current timestamp as the key
  }

  if (req.file) {
    // Define uploadParams with a static key
    const uploadParams = {
      Bucket: "kuberemployeemanagementimages",
      Key: "", // Leave it empty for now
    };

    // Set the Key property using the generated key function
    uploadParams.Key = generateKey;
    uploadParams.Body = req.file.buffer;

    // Upload file to S3
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to upload file to S3" });
      }
      // File uploaded successfully, return URL or other relevant info
      // res.end({ url: data.Location });
      console.log({ url: data.Location });
    });
  }

  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    // else {
    //   res.json({
    //     status: "success",
    //     message: "Employee updated successfully.",
    //     employee: req.body,
    //     // file: req.file,
    //   });
    // }
  });
});

app.put("/update-project", (req, res) => {
  console.log(req.body);

  let sql = `UPDATE projects SET title = '${req.body.title}', department = '${req.body.department}', priority = '${req.body.priority}', status = '${req.body.status}', team = '${req.body.team}', description = '${req.body.description}' WHERE projectID = '${req.body.projectID}'`;

  db.query(sql, (err) => {
    if (err) {
      throw err;
    } else {
      res.json({
        status: "success",
        message: "Project updated successfully.",
        project: req.body,
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

app.delete("/delete-project/:id", (req, res) => {
  let sql = `DELETE FROM projects WHERE projectID = (?)`;

  let vals = [req.params.id];

  db.query(sql, [vals], (err, res) => {
    if (err) {
      throw err;
    }
  });
  res.json("Project deleted.");
});

app.listen(PORT, () => {
  console.log("Server running on port 8080...");
});
