const express = require('express');
const router = express.Router();
const pool = require('./db/postgresPool');

router.get('/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
  res.json(result.rows);
});

router.post('/todos', async (req, res) => {
  const { text } = req.body;
  const result = await pool.query(
    'INSERT INTO todos (text) VALUES ($1) RETURNING *',
    [text]
  );
  res.json(result.rows[0]);
});

router.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error('Postgres connection error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
