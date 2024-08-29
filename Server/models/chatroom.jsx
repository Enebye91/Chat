const mongoose = require('mongoose'); 

const ChatroomSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  module.exports = mongoose.model(ChatroomSchema); 