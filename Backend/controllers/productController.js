const Product =require("../services/productService");

module.exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const result = await Product.newProduct(productData);
    if (result) {
      return res.status(201).json({ message: "Product created successfully" });
    } else {
      return res.status(400).json({ message: "Failed to create product" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports.listProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const result = await Product.updateProduct(productId, productData);
    if (result) {
      return res.status(200).json({ message: "Product updated successfully" });
    } else {
      return res.status(400).json({ message: "Failed to update product" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.deleteProduct(productId);
    if (result) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(400).json({ message: "Failed to delete product" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}