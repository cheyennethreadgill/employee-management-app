import app from "../server";

// Wrap the Express app with serverless-http so Vercel can invoke it as a handler
export default app;
