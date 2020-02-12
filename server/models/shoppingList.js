const mongoose = require('mongoose')
const shortid = require('shortid')

const shoppingListSchema = new mongoose.Schema({
  shortid: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
    required: true
  },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  items: [
    {
      name: String,
      crossedOut: Boolean
    }
  ]
})

shoppingListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('shoppingListSchema', shoppingListSchema)
