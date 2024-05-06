import cors from "cors";
import multer from "multer";
import express from "express";
import bodyParser from "body-parser";
import authRouter from "./Routes/auth.routes.js";
import { findUserRoute, deleteUserRoute } from "../server/Routes/user.routes.js";
import { getProjectsRouter, addProjectsRouter, updateProjectsRouter } from "../server/Routes/project.routes.js";
import { employeeRouter } from "../server/Routes/employee.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// aws
// upload to multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
});

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

app.use("/add-employee", upload.single("image"));
app.use("/update-employee", upload.single("image"));

app.use("/find-user", findUserRoute);
app.use("/delete-user", deleteUserRoute);

app.use("/admin", employeeRouter);

app.use("/add-project", addProjectsRouter);
app.use("/all-projects", getProjectsRouter);
app.use("/update-project", updateProjectsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port 8080... 
   --------------------------------------------------------------------`);
});
