const { Pool } = require('pg');

const pool = new Pool({
  user: 'JorgeAndArias',
  host: 'localhost',
  database: 'my_todo_app',
  password: '',
  port: 5432,
});

module.exports = pool;
