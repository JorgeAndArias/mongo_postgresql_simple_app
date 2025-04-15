const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todoapp');

const todoSchema = new mongoose.Schema({
  text: String,
});

module.exports = mongoose.model('Todo', todoSchema);
