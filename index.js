require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const express = require("express");
const app = express();

const config = {
  logDB: false, // toggle logging to database
  logLocal: false, // to enable local logging set logDB: false, and logLocal: true

  logJSON: true, // toggle json logging (logLocal must be set to true)
  logCSV: true, // toggle csv logging (logLocal must be set to true)
  dataDir: "data", // set local data directory
  hostname: "127.0.0.1",
  port: 3000,
};

/* Middleware */
app.use(express.static("public"));
app.use(express.json());

/* SAVE DATA TO DATABASE */
if (config.logDB == true) {
  /* Connect to DB */
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to database."));

  /* Routes */
  const router = require("./routes/api");
  app.use("/", router);
}

/* SAVE DATA LOCALLY */
if (config.logLocal == true) {
  app.post("/", (req, res) => {
    let filename = req.body.unixTimestamp;

    // Save as JSON
    if (config.logJSON == true) {
      let filepath = makePath(config.dataDir, filename, "json");
      let data = JSON.stringify(req.body, null, 2);

      fs.appendFile(filepath, data, "utf8", (err) => {
        if (err) throw err;
        console.log("JSON updated!");
      });
    }

    // Save as CSV
    if (config.logCSV == true) {
      let filepath = makePath(config.dataDir, filename, "csv");

      let data;
      if (fs.existsSync(filepath)) {
        data = json2csv(req.body, (header = false));
      } else {
        data = json2csv(req.body, (header = true)); // save with header if new file
      }

      fs.appendFile(filepath, data, "utf8", (err) => {
        if (err) throw err;
        console.log("CSV updated!");
      });
    }

    res.json({ message: "Data received." });
  });
}

/* Start server */
app.listen(config.port, config.hostname, () => {
  console.log(`App running at http://${config.hostname}:${config.port}/`);
});

/* HELPER FUNCTIONS */

function json2csv(obj, header = false) {
  var csv = "";

  if (header == true) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        csv += i + ",";
      }
    }
    csv = csv.substring(0, csv.length - 1);
    csv += "\n";
  }

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      csv += obj[i] + ",";
    }
  }
  csv = csv.substring(0, csv.length - 1);
  csv += "\n";
  return csv;
}

function makePath(dataDir, filename, filetype) {
  // dataDir and filetype must be Strings
  let path = dataDir + "/" + String(filename) + "." + filetype;
  return path;
}
