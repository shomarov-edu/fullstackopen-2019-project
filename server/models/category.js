const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const shortid = require('shortid')

const categorySchema = new mongoose.Schema({
  shortid: {
    type: String,
    default: shortid.generate
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
