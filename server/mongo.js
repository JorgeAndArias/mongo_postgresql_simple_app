const express = require('express');
const router = express.Router();
const Todo = require('./db/mongoModel');

router.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.post('/todos', async (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({ text });
  await newTodo.save();
  res.json(newTodo);
});

module.exports = router;
