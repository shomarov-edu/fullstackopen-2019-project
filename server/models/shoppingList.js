const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  ],
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('shoppingListSchema', shoppingListSchema);
