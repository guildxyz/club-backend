import "./config/environment.js";
import cors from "cors";
import express from "express";
import api from "./api/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(api());

app.listen(process.env.PORT, () => {
  console.info(`Listening at http://localhost:${process.env.PORT}`);
});
