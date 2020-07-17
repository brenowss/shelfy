import express from "express";
import cors from "cors";
import routes from "./routes";
import path from 'path'

import './database/connection'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/images", express.static(path.resolve(__dirname, "..", "images")))

app.listen(1357, () =>
  console.log("🔥️ Server running at https://localhost:1357")
);
