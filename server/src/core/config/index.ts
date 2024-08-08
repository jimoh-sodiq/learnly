import dotenv from "dotenv";

const envIsPresent = dotenv.config();

if (!envIsPresent) {
  throw new Error(
    "No .env file found for this project, please add a .env file"
  );
}

const globalConfig = {
  port: process.env.PORT,
  mongodb: {
    mongoUri: process.env.MONGO_URI,
    mongoUriDev: process.env.MONGO_URI_DEV
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtLifetime: process.env.JWT_LIFETIME,
  },
};

export default globalConfig;
