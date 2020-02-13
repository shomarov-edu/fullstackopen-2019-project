const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  firstname: String,
  lastname: String,
  passwordHash: String,
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  shoppingLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShoppingList'
    }
  ],
  photo: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
