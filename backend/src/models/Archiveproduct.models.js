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
}, { timestamps: true });

// Define the model
const ArchiveProduct = mongoose.model("archiveproducts", Schema);

module.exports = ArchiveProduct;
