const express = require("express");
const app = express();
const Product = require("./product.js"); 

  
const port = 3000;    
       
app.use(express.json());

// Welcome message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MarketPlace application" });
});

// Getting all the products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        if (products.length === 0) {
            res.status(200).json({ message: "No products available" });
        } else {
            res.status(200).json(products);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Getting a product by ID
app.get("/api/product/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
          return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
      }
      res.status(200).json(product);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Adding a product to the database
app.post("/api/product", async (req, res) => {
  try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
});

// Updating a product by ID
app.put("/api/product/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
          return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
      }
      res.status(200).json(updatedProduct);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Deleting a product by ID
app.delete("/api/product/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
          return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
      }
      res.status(200).json({message:"All the products has been deleted"});
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Deleting all the products
app.delete("/api/product", async (req, res) => {
  try {
      await Product.deleteMany({});
      res.status(204).json({ message: "All products have been deleted successfully." });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});

// Search for products by name
app.get("/api/Product", async (req, res) => {
  const { name } = req.query;
  try {
      const products = await Product.find({ name: { $regex: name, $options: "i" } });
      if (products.length === 0 || !products) {
          res.status(404).json({ message: `No products found with name containing '${name}'` });
      } else {
          res.status(200).json(products);
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is connected at http://localhost:${port}`);
});