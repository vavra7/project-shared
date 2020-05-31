import { TEST_A } from "@project-shared/app/src/pages/test";
// import { TEST_S } from "./test";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send(TEST_A);
});

app.listen(4000, () => console.log("Server started on port 4000"));
