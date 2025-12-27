import app from "../server";
import serverless from "serverless-http";

// Wrap the Express app with serverless-http so Vercel can invoke it as a handler
export default serverless(app);
