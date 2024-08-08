import mongoose from "mongoose";
import type { Express } from "express";
import globalConfig from '../config';

export default class ServerConnector {
  private url =  globalConfig.mongodb.mongoUriDev ?? globalConfig.mongodb.mongoUri

  private port = globalConfig.port;

  private async connectDB() {
    if(!this.url) throw new Error("mongodb url is not defined, please include it in the .env file");
    console.log("url", this.url)
    return mongoose.connect(this.url);
  }

  public async start(app: Express): Promise<void> {
    try {
      await this.connectDB();
      console.log("connection to the string")
      app.listen(this.port, () => {
        console.log("server is listening on port " + this.port);
        // pino logger
      });
    } catch (e) {
      console.error(e);
    }
  }
}
