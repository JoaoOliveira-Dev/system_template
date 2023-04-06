const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "template_project",
});

app.get("/", (req, res) => {
  // const sqlInsert =
  //   "INSERT INTO users (usuario, senha, email) VALUES ('teste', '81dc9bdb52d04dc20036dbd8313ed055', 'teste@hotmail.com');";

  // db.query(sqlInsert, (err, result) => {
  //   res.send("Hello World!");
  // });

  res.send("Hello World!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
