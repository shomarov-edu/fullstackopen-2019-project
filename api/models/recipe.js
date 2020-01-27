const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  time: Number,
  difficulty: String,
  ingredients: [String],
  notes: [String],
  source: String,
  date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)
