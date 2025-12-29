import app from "../server.js";
import ServerlessHttp from "serverless-http";

// export default ServerlessHttp(app);

// ...existing code...
console.log("api/index module loaded");

export default async function handler(req, res) {
  console.log("api handler invoked");
  try {
    const { default: app } = await import("../server.js");
    console.log("server app imported");
    // call the Express app directly (it is a (req,res) handler)
    return app(req, res);
  } catch (err) {
    console.error("api handler error", err);
    res.status(500).send("Server handler import error");
  }
}
// ...existing code...
