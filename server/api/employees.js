import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function getEmployees(req, res) {
  try {
    await client.connect();

    const employees = await client.db(process.env.MONGODB_DBNAME).collection("employees").find({}).toArray();

    console.log("******************employees api is working");

    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
