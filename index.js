import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRouter from "./routes/task.route.js";
import cors from 'cors';

dotenv.config();
let PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors())

// Configure CORS to allow multiple origins
const corsOptions = {
  origin: ['https://jiraapis.onrender.com', 'https://future-swim.surge.sh'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`server listening on port 5000, http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'OK',
  });
})

app.use("/api/v1/tasks", taskRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
