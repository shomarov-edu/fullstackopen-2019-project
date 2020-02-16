const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
  private: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: String
    }
  ],
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
  coverPhoto: String,
  photos: [String]
});

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

recipeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Recipe', recipeSchema);
