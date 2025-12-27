import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./Routes/auth.routes.js";
import { getProjectsRouter, addProjectsRouter, updateProjectsRouter } from "./Routes/project.routes.js";
import { employeeRouter } from "./employees.js";
import { connectDB } from "./database.js";
import multer from "multer";
import { connect } from "mongoose";

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

// await connectDB();
// Do not connect to DB at module import time in serverless environments.
// Connect inside route handlers via `connectDB()` when needed.^^^^

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
// app.use("/auth", authRouter);

app.use("/api", employeeRouter);

// app.use("/api", (req, res, next) => {
//   res.send("employees api json working (server.js)");
// });

app.use("/", (req, res) => {
  res.send("Welcome to the Kuber Employee Management API! (Root path)");
});

// ***************************** TESTING
// app.use("/api", (req, res) => {
//   res.send("employees api json working (employee.js)");
// });

// app.use("/add-project", addProjectsRouter);
// app.use("/all-projects", getProjectsRouter);
// app.use("/update-project", updateProjectsRouter);

// In serverless deployments we must not start a listener here.

app.listen(PORT, () => {
  console.log(`***********Server running on port ${PORT}....*********`);
});
// The platform (Vercel) will call the exported handler instead.

export default app;
