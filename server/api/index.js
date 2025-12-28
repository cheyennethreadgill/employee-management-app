import app from "../server.js";
import ServerlessHttp from "serverless-http";

console.log("api/index.js imported");

export default ServerlessHttp(app);
