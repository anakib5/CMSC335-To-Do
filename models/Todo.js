const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  doBy: { type: String },                // NEW
  urgency: { type: String },             // NEW
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);
