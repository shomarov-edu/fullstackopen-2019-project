const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const shoppingListSchema = new mongoose.Schema({
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

shoppingListSchema.plugin(uniqueValidator)

module.exports = mongoose.model('shoppingListSchema', shoppingListSchema)
