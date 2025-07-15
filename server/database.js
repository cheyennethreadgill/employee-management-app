import dotenv from "dotenv";
import { MongoClient } from "mongodb";

// configure .ENV file
dotenv.config();

export const URI = process.env.MONGODB_URI;

// set up new client
const client = new MongoClient(URI);

// connect to database
export const database = client.db("Kuber_Employee_Management_DB");

// make a query from employees that shows all employees
export const employees = database.collection("employees");
export const projects = database.collection("projects");
export const users = database.collection("users");
export const sessions = database.collection("sessions");

// const foundEmployee = await employees.findOne({ fname: "test" });
// console.log(foundEmployee);

// export { URI, database, employees, projects, users, sessions };

