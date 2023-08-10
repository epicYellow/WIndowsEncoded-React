const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  ParentQuestionId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  answerDescription: {
    type: String,
    required: true,
  },
  codeSnippet: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  language: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    required: true,
  },
  downvotes: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Answers", AnswerSchema);
