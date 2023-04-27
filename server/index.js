const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const jwt = require("jsonwebtoken");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "template_project",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM tab_usuario";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching users");
    }
    return res.status(200).send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const login = req.body.login;
  const user = req.body.user;
  const email = req.body.email;
  const password = req.body.password;

  const sqlInsert =
    "INSERT INTO tab_usuario (usuario, login, senha, email) VALUES (?,?,MD5(?),?);";
  db.query(sqlInsert, [user, login, password, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting user");
    }
    console.log(result);
    return res.status(200).send("User inserted successfully");
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, "jwtSecret", function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }

    req.userId = decoded.id;
    next();
  });
};

app.get("/api/isAuth", verifyJWT, (req, res) => {
  return res.status(200).send({ auth: true, message: "Authenticated" });
});

app.post("/api/login", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  const sqlSelect =
    "SELECT * FROM tab_usuario WHERE login = ? AND senha = MD5(?);";
  db.query(sqlSelect, [user, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching users");
    }
    if (result.length > 0) {
      const id = result[0].id;
      const token = jwt.sign({ id }, "jwtSecret", {
        expiresIn: 300,
      });

      ret = [{ id: result[0].id, token: token }];

      return res.status(200).send(ret);
    } else {
      return res.status(404).send("User not found");
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
