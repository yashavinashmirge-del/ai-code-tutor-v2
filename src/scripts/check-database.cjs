////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : check-database.cjs
// Module       : Database Verification
// Description  : Lists all tables inside the SQLite database.
//
////////////////////////////////////////////////////////////

const Database = require("better-sqlite3");

// Open the authentication database.
const db = new Database("./auth.db", { readonly: true });

// Retrieve all database tables.
const tables = db.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    ORDER BY name
`).all();

// Display the tables.
console.log("Authentication Database Tables:");
console.table(tables);

// Close the database connection.
db.close();