const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    category: {
        type: String,
    }
});

// Create a model from the schema
const Product = mongoose.model("product", productSchema);

// Connecting to a database to the database
mongoose
    .connect('mongodb+srv://assignment02:assignment02@cluster0.cdukxu3.mongodb.net/Marketplace', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed: " + error);
    });
  
module.exports = Product;