import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.postgres,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;