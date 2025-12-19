import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import aws from "aws-sdk";

export const employeeRouter = new Router();

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

employeeRouter.get("/employees", async (req, res, next) => {
  //   try {
  //     let foundArray = [];
  //     const allEmployeesFound = employees.find();

  //     for await (const doc of allEmployeesFound) {
  //       foundArray.push(doc);
  //     }
  //     res.json(foundArray);
  //   } catch (err) {
  //     console.log(`************error getting employees in employee route: ${err}`);
  //     next(err);
  //   }
  try {
    await client.connect();

    const employees = await client.db(process.env.MONGODB_DBNAME).collection("employees").find({}).toArray();

    console.log("******************employees api is working");

    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// export default async function getEmployees(req, res) {
//   try {
//     await client.connect();

//     const employees = await client.db(process.env.MONGODB_DBNAME).collection("employees").find({}).toArray();

//     console.log("******************employees api is working");

//     return res.status(200).json(employees);
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// }
