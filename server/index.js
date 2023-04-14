const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const routes = require("./routes");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "template_project",
});

app.use(cors());
app.use(routes);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM users";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching users");
    }
    return res.status(200).send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const user = req.body.user;
  const email = req.body.email;
  const password = req.body.password;

  const sqlInsert =
    "INSERT INTO users (usuario, senha, email) VALUES (?,MD5(?),?);";
  db.query(sqlInsert, [user, password, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting user");
    }
    console.log(result);
    return res.status(200).send("User inserted successfully");
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
