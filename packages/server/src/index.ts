import { TEST_A } from "@project-shared/app/src/pages/test";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  let a = TEST_A(1, 2);

  console.log(a);

  res.send(a);
});

app.listen(5000, () => console.log("Server started on port 5000"));
