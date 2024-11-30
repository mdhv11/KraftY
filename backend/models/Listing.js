const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String },
  // Add more fields as needed
});

module.exports = mongoose.model('Listing', ListingSchema);
