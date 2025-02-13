import express, { Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "./config/prisma";
import authRouter from './routes/auth'

import adminRouter from "./routes/admin";
import { create_inital_db_entry } from "./config/inital_database_entry";
import { authenticate } from "./middlewares/authMiddleware";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const app_name = process.env.APP_NAME;

// Middleware
app.use(express.json());

// Basic route
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);


// Start the server, and prisma client
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  prisma.$connect().then(() => console.log("Database connected"));

  create_inital_db_entry()
    .then(() => console.log("Initial database entry created"))
    .catch((e) => console.error(e));
});

export default app;
