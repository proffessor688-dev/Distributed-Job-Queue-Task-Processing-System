const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: "admin",
  password: "admin",
  database: "jobsdb",
  port: 5432,
});

module.exports = pool;
