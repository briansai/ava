const Pool = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config({ silent: 'true' });

const pool = new Pool({
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

module.exports = pool;
