import app from "../../server/server";

// Wrap the Express app with serverless-http so Vercel can invoke it as a handler
export default app;
