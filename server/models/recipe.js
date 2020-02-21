const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  added: Date
});

const recipeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cookTime: Number,
  difficulty: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  method: {
    type: [String],
    required: true
  },
  notes: [String],
  tags: [String],
  source: String,
  created: {
    type: Date,
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    }
  ],
  ratings: [
    {
      rater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
      },
      score: {
        type: Number,
        min: 1,
        max: 5
      }
    }
  ],
  comments: [commentSchema]
});

module.exports = mongoose.model('Recipe', recipeSchema);
