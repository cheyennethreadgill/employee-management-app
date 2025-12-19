import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

// configure .ENV file
dotenv.config();

const URI = process.env.MONGODB_URI;
const DBNAME = process.env.MONGODB_DBNAME;

// set up new client
// const client = new MongoClient(URI);

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
    console.log("***You've successfully connected to MongoDB!");
    return db;
  } catch (err) {
    console.log("something went wrong with connecting to MongoDB");
  }
}

console.log("server working");

// const employees = database.collection("employees");
// const projects = database.collection("projects");
// const users = database.collection("users");
// const sessions = database.collection("sessions");
// export { URI, database, employees, projects, users, sessions };
