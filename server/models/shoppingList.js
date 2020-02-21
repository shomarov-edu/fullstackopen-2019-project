const mongoose = require('mongoose');

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
      content: String,
      checked: Boolean
    }
  ],
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
