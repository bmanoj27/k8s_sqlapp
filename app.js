const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: 'mysql-service',
  user: 'root',
  password: 'yourpassword',
  database: 'userdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      ID: <input type="text" name="id"><br>
      Email: <input type="email" name="email"><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { id, email } = req.body;
  
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send('ID already exists.');
    } else {
      db.query('INSERT INTO users (id, email) VALUES (?, ?)', [id, email], (err, result) => {
        if (err) throw err;
        res.send('Data inserted.');
      });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
