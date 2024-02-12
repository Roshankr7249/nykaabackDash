const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  picture: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Basic URL format validation
        return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
      },
      message: 'Invalid URL format for picture',
    },
  },
  description: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  category: {
    type: String,
    enum: ['makeup', 'skincare', 'haircare'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
