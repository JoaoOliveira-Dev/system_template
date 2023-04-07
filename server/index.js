const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "template_project",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const user = req.body.user;
  const email = req.body.email;
  const password = req.body.password;

  const sqlInsert =
    "INSERT INTO users (usuario, senha, email) VALUES (?,MD5(?),?);";
  db.query(sqlInsert, [user, password, email], (err, result) => {
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
