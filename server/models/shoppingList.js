const mongoose = require('mongoose')

const shoppingListSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
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
