import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import vectorSearch from "./vectorSearch.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/vectors", vectorSearch);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Vector API running on http://localhost:${PORT}`);
});