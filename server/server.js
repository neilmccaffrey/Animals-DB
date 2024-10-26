require('dotenv').config(); // Load environment variables

const mysql = require('mysql2');

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