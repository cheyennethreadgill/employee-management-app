import app from "../server";
import ServerlessHttp from "serverless-http";

export default ServerlessHttp(app);
