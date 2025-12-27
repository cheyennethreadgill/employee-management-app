import app from "../../server/server.js";

// Wrap the Express app with serverless-http so Vercel can invoke it as a handler
export default app;
