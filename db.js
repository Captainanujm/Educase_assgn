const mysql = require('mysql2');
require('dotenv').config();

// connection for database
let con = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { 
        rejectUnauthorized: false 
    }
});

// export promise so we can use async await
module.exports = con.promise();
