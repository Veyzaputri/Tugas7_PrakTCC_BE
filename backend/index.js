import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import NotesRoute from "./routes/NotesRoute.js";
import sequelize from "./config/Database.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "https://20250519t195523-dot-e-13-450704.uc.r.appspot.com",
  credentials: true,
}));
app.use(express.json());

app.use(UserRoute);
app.use(NotesRoute);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync(); // sinkronisasi model

    // Menggunakan PORT dari environment atau default ke 5000
    const port = process.env.PORT || 5000;
    app.listen(port, '0.0.0.0',() => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
