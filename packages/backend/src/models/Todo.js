const mongoose = require('../database');

const TodoSchema = new mongoose.Schema({
  description: {type: String, required: true},
  isDone: {type: Boolean, required: true, default: false},
  user : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Todo', TodoSchema);