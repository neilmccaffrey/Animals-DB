const express = require('express');
const app = express();
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies


// Set up MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME    
});

// Connect to the database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');

    // Create table query
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    diet VARCHAR(255) NOT NULL,
    continent VARCHAR(255) NOT NULL,
    picture VARCHAR(255) NOT NULL
  )
`;

// Execute the query
db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table:', err);
    return;
  }
  console.log('Table "animals" created or already exists');
});
});

app.get('/search', (req, res) => {
    const { size, continent, type, diet } = req.query; // destructure query parameters
  
    let query = 'SELECT * FROM animals WHERE 1=1'; // 1=1 aways evaulates to true, a neutral starting point. 
    const params = [];
  
    if (size) {
      query += ' AND size = ?';
      params.push(size);
    }
    if (continent) {
      query += ' AND continent = ?';
      params.push(continent);
    }
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    if (diet) {
      query += ' AND diet = ?';
      params.push(diet);
    }
  
    db.query(query, params, (err, results) => {
      if (err) {
        console.error('Error fetching animals:', err);
        res.status(500).send('Error fetching animals');
      } else {
        res.json(results);
      }
    });
  });

  const addAnimal = (name, size, type, diet, continent, picture) => {
    const insertQuery = 'INSERT INTO animals (name, size, type, diet, continent, picture) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [name, size, type, diet, continent, picture], (err, result) => {
      if (err) {
        console.error('Error adding animal:', err);
        return;
      }
      console.log('Animal added:', result.insertId);
    });
  };
  
  // add an animal ***COMMENT OUT AFTER ADDING***
  //addAnimal('Elephant', 'Extra Large', 'Mammal', 'Herbivore', 'Africa', 'images/elephant.jpg' );

  // Set a port for the server to listen on
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});