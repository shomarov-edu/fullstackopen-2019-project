const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const categorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ]
})

categorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

categorySchema.plugin(uniqueValidator)

module.exports = mongoose.model('Category', categorySchema)
