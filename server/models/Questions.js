const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userProfileImg: { type: String, required: true },
  username: { type: String, required: true },
  questionTitle: { type: String, required: true },
  questionDescription: { type: String, required: true },
  codeSnippet: { type: String, required: true },
  date: { type: Date, default: Date.now },
  language: { type: String, required: true },
  tags: {
    type: Array,
    // required: true
  },
  upvotes: {
    type: Number,
    required: true,
  },
  upvoted: {
    type: Array,
  },
  downvotes: {
    type: Number,
    required: true,
  },
  downvoted: {
    type: Array,
  },
  score: {
    type: Number,
  },
  reported: {
    type: Boolean,
  },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Questions", QuestionSchema);
