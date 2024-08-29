const mongoose = require('mongoose'); 

const ChatroomParticipantSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    charroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chatroom',
      required: true,
    },
    JoinedAt: {
      type: Date,
      default: Date.now,
    },
  });

  module.exports = mongoose.model(ChatroomParticipantSchema); 