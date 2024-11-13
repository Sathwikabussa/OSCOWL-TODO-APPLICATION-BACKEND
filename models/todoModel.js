const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const todoSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  userId: { type: String, ref: 'User' },
  title: String,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Todo', todoSchema);
