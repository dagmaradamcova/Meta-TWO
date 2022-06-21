// const http = require("http");
// const fs = require("fs");
const express = require("express");
const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.use(express.static("public"));

app.listen(port, hostname, () => {
  console.log(`App running at http://${hostname}:${port}/`);
});
