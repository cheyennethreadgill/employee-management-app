import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

// configure .ENV file
dotenv.config();

const URI = process.env.MONGODB_URI;
const DBNAME = process.env.MONGODB_DBNAME;

// set up new DB client
export async function connectDB() {
  try {
    // setting up client
    const client = new MongoClient(URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db(DBNAME);

    const employees = await db.collection("employees").find({}).toArray();

    console.log(employees, "<<<<<employees log");

    console.log("*************You've successfully connected to MongoDB! DB File***********");
    return db;
  } catch (err) {
    console.log("something went wrong with connecting to MongoDB, DB File");
  }
}

console.log("**********database working***************");

// const employees = database.collection("employees");
// const projects = database.collection("projects");
// const users = database.collection("users");
// const sessions = database.collection("sessions");
// export { URI, database, employees, projects, users, sessions };
