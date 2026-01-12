const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dishant@dishant",
  database: "dishant"
});


db.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("MySQL connected");
  }
});


app.post("/signup", (req, res) => {
  console.log("REQUEST BODY:", req.body); 

  const sql =
    "INSERT INTO users1 (firstname, lastname, email, role, phoneno, address, password) VALUES (?)";

  const values = [
    req.body.firstname,                
    req.body.lastname,
    req.body.email,
    req.body.role,
    req.body.phoneno,
    req.body.address,
    req.body.password,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json(err);
    }
    return res.json("Signup success");
  });
});



app.post('/login', (req, res) => {
  console.log("LOGIN BODY:", req.body);

  const sql = "SELECT * FROM users1 WHERE email = ? AND password = ?";
  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json("error");
    }

    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json("fail");
    }
  });
});



app.get('/users', (req, res) => {
  const sql = "SELECT id, firstname, lastname, email, role  FROM users1";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(data);
  });
});





app.get('/users/:id', (req, res) => {
  const sql = "SELECT id, firstname, lastname, email, role, phoneno, address FROM users1 WHERE id = ?";
  const id = req.params.id;
  
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (data.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(data[0]);
  });
});




app.put('/users/:id', (req, res) => {
  const sql = `
    UPDATE users1 
    SET firstname = ?, lastname = ?, email = ?, role = ?, phoneno = ?, address = ?
    WHERE id = ?`;

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.body.role,
    req.body.phoneno,
    req.body.address,
    req.params.id
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json({ message: "User updated successfully" });
  });
});




app.delete('/users/:id', (req, res) => {
  const sql = "DELETE FROM users1 WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json({ message: "User deleted successfully" });
  });
});





app.listen(8081 , ()=>{
    console.log("server is running")
})