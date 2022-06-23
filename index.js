const fs = require("fs");
const express = require("express");
const app = express();

const config = {
  logJSON: true, // toggle json logging
  logCSV: true, // toggle csv logging
  dataDir: "data", // set data directory
  hostname: "127.0.0.1",
  port: 3000,
};

app.use(express.static("public"));
app.use(express.json());

app.listen(config.port, config.hostname, () => {
  console.log(`App running at http://${config.hostname}:${config.port}/`);
});

/* Handle incoming data */
app.post("/", (request, response) => {
  console.log("Got a request!");
  //console.log(request.body);

  response.json({ Status: "Data received." });

  // Save as JSON
  if (config.logJSON == true) {
    let data = JSON.stringify(request.body, null, 2);
    let filename = request.body.subjectID;
    let filepath = makePath(config.dataDir, filename, "json");

    console.log(filename);
    console.log(filepath);

    fs.appendFile(filepath, data, "utf8", function (err) {
      if (err) throw err;
      console.log("JSON updated!");
    });
  }

  // Save as CSV
  if (config.logCSV == true) {
    let filename = request.body.subjectID;
    let filepath = makePath(config.dataDir, filename, "csv");

    let data;
    if (fs.existsSync(filepath)) {
      data = json2csv(request.body, (header = false));
    } else {
      data = json2csv(request.body, (header = true));
    }

    console.log(filepath);

    fs.appendFile(filepath, data, "utf8", function (err) {
      if (err) throw err;
      console.log("CSV updated!");
    });
  }

  // Save to Database
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
