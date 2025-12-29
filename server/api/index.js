import app from "../server.js";
import ServerlessHttp from "serverless-http";

export default ServerlessHttp(app);
