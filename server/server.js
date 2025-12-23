import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./Routes/auth.routes.js";
import { getProjectsRouter, addProjectsRouter, updateProjectsRouter } from "./Routes/project.routes.js";
import { employeeRouter } from "./api/employees.js";
import { connectDB } from "./api/database.js";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 8080;

// upload to multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
});
// Configure AWS SDK with environment variables

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};

// waiting for the DB to connect
await connectDB();

// middleware used for entire application
app.use(cors(corsOptions));

//requests handled already at app level

app.use(
  bodyParser.json({
    limit: 10000000,
  })
);

app.use(bodyParser.urlencoded({ extended: true, limit: 10000000 }));

app.use(upload.single("image"));

// all requests to sign up and login with be router using router in auth.routes
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Kuber Employee Management API!");
});

// app.use("/api", employeeRouter);
app.get("/api/employees", async (req, res, next) => {
  try {
    // awaiting a new database connection
    // const db = await connectDB();

    // const employees = await db.collection("employees").find({}).toArray();

    // console.log(employees, "<<<<<<<<<employees in api");
    // return res.status(200).json(employees);

    // *************************testing
    res.send("employees api json working (server.js)");
    // res.send(employees);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  // try {
  //   let foundArray = [];
  //   const allEmployeesFound = employees.find();

  //   for await (const doc of allEmployeesFound) {
  //     foundArray.push(doc);
  //   }
  //   res.json(foundArray);
  // } catch (err) {
  //   console.log(`************error getting employees in employee route: ${err}`);
  //   next(err);
  // }
});

// ***************************** TESTING
// app.use("/api", (req, res) => {
//   res.send("employees api json working (employee.js)");
// });

app.use("/add-project", addProjectsRouter);
app.use("/all-projects", getProjectsRouter);
app.use("/update-project", updateProjectsRouter);

app.listen(PORT, () => {
  console.log(`***********Server running on port ${PORT}...*********`);
});
