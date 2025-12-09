import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

// configure .ENV file
dotenv.config();

export const URI = process.env.MONGODB_URI;
const DBNAME = process.env.MONGODB_DBNAME;

// set up new client
// const client = new MongoClient(URI);
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(DBNAME).command({ ping: 1 });
    console.log("******************************************You successfully connected to MongoDB!");
    // connect to database
    // make a query from employees that shows all employees
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

console.log("server working");

// const employees = database.collection("employees");
// const projects = database.collection("projects");
// const users = database.collection("users");
// const sessions = database.collection("sessions");
// export { URI, database, employees, projects, users, sessions };
