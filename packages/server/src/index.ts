// import { TEST_A } from "@project-shared/app/src/pages";
import { TEST_S } from "./test";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send(TEST_S);
});

app.listen(4000, () => console.log("Server started on port 4000"));
