// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists) {
    db.run(
      "CREATE TABLE Dreams (id INTEGER PRIMARY KEY AUTOINCREMENT, flag TEXT, name TEXT, description TEXT, Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)"
    );
    console.log("New table Dreams created!");

    // insert default dreams
    db.serialize(() => {
      db.run(
        'INSERT INTO Dreams (flag, name, description) VALUES ("data:image/png;base64,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", "Austin Grove", "This is the first flag")'
      );
    });
  } else {
    console.log('Database "Dreams" ready to go!');
    db.each("SELECT * from Dreams", (err, row) => {
      if (row) {
        console.log(`record: ${row.flag}, ${row.name}, ${row.description}`);
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

// endpoint to get all the dreams in the database
app.get("/getDreams", (request, response) => {
  db.all("SELECT * from Dreams", (err, rows) => {
    response.send(JSON.stringify(rows));
  });
});

// endpoint to add a dream to the database
app.post("/addDream", (request, response) => {
  console.log(`add to dreams ${request.body.dream}: ${request.body.description}`);

  // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
  if (!process.env.DISALLOW_WRITE) {
    const cleansedFlag = cleanseString(request.body.flag);
    const cleansedDream = cleanseString(request.body.dream);
    const cleansedDesc = cleanseString(request.body.description);
    console.log("variables: " + cleansedDream, cleansedDesc + "flag: " + cleansedFlag);
    db.run(`INSERT INTO Dreams (flag, name, description) VALUES (?, ?, ?)`, [cleansedFlag, cleansedDream, cleansedDesc], error => {
      if (error) {
        response.send({ message: "error!" });
      } else {
        response.send({ message: "success" });
      }
    });
  }
  
  
  // if (!process.env.DISALLOW_WRITE) {
  //   const cleansedDream = cleanseString(request.body.dream);
  //   const cleansedDesc = cleanseString(request.body.description);
  //   console.log("variables: " + cleansedDream, cleansedDesc);
  //   db.run(`INSERT INTO Dreams (dream) VALUES (cleansedDream)`);
  // }
  
  
});

// endpoint to clear dreams from the database
app.get("/clearDreams", (request, response) => {
  // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
  if (!process.env.DISALLOW_WRITE) {
    db.each(
      "SELECT * from Dreams",
      (err, row) => {
        console.log("row", row);
        db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
          if (row) {
            console.log(`deleted row ${row.id}`);
          }
        });
      },
      err => {
        if (err) {
          response.send({ message: "error!" });
        } else {
          response.send({ message: "success" });
        }
      }
    );
  }
});

// helper function that prevents html/css/script malice
const cleanseString = function(string) {
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});