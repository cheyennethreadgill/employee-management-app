import { Router } from "express";
import { connectDB } from "../database.js";

export const projectRouter = new Router();

// ***********************************************************GET PROJECTS
projectRouter.get("/all-projects", async (req, res, next) => {
  try {
    const db = await connectDB();
    const projects = await db.collection("projects").find({}).toArray();
    return res.status(200).json(projects);
  } catch (err) {
    console.log(`error getting projects: ${err}`);
    next(err);
  }
});

// ***********************************************************ADD PROJECTS
export const addProjectsRouter = projectRouter.post("/", async (req, res) => {
  console.log(req.body);

  let projectInfo = {
    title: req.body.title,
    projectID: req.body.projectID,
    department: req.body.department,
    priority: req.body.priority,
    client: req.body.client,
    price: req.body.price,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    team: req.body.team,
    status: req.body.status,
    description: req.body.description,
  };

  let idLength = projectInfo.projectID.length > 4;

  // check id length send 500 error if length check failed
  if (idLength) {
    res.json({ message: "Form Error: Project ID must be 4 characters." });
  } else {
    try {
      await projects.insertOne(projectInfo);

      res.json({
        status: "success",
        message: "project added successfully.",
        project: req.body,
      });
    } catch (err) {
      console.log(`error adding project: ${err}`);
      next(err);
    } finally {
      console.log("User project action complete.");
      res.end();
    }
  }
});

// ***********************************************************EDIT PROJECTS
export const updateProjectsRouter = projectRouter.put("/", async (req, res) => {
  console.log(req.body);

  let filterProject = {
    projectID: req.body.projectID,
  };

  let projectInfo = {
    $set: {
      title: req.body.title,
      projectID: req.body.projectID,
      department: req.body.department,
      priority: req.body.priority,
      client: req.body.client,
      price: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      team: req.body.team,
      status: req.body.status,
      description: req.body.description,
    },
  };

  try {
    await projects.updateOne(filterProject, projectInfo);

    res.json({
      status: "success",
      message: "project updated successfully.",
      projectUpdated: req.body,
    });
  } catch (err) {
    console.log(`error updating project: ${err}`);
    next(err);
  } finally {
    console.log("User project update complete.");
    res.end();
  }
});
