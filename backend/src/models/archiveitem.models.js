const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
  supplier_name: {
    type: String,
    trim: true,
  },
  archivedAt: {
    type: Date,
    default: Date.now, // Automatically sets the archive date
  }
}, { timestamps: true });

// Creating the model
const model = mongoose.model("archiveitem", Schema);
module.exports = model;
