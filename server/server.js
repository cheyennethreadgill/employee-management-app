import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./Routes/auth.routes.js";
import { getProjectsRouter, addProjectsRouter, updateProjectsRouter } from "./Routes/project.routes.js";
import { employeeRouter } from "./Routes/employee.routes.js";
import aws from "aws-sdk";

import multer from "multer";

const app = express();
const PORT = process.env.PORT || 8080;

// aws
// upload to multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
});

// Configure AWS SDK with environment variables
// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create S3 instance
const s3 = new aws.S3();

// middleware used for entire application
app.use(cors());
app.use(
  bodyParser.json({
    limit: 10000000,
  })
);

app.use(bodyParser.urlencoded({ extended: true, limit: 10000000 }));

// all requests to sign up and login with be router using router in auth.routes
app.use("/auth", authRouter);

app.use("/add-employee", upload.single("image"), employeeRouter);
app.use("/update-employee", upload.single("image"), employeeRouter);

app.use("/admin", employeeRouter);

app.use("/add-project", addProjectsRouter);
app.use("/all-projects", getProjectsRouter);
app.use("/update-project", updateProjectsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port 8080... 
   --------------------------------------------------------------------`);
});
