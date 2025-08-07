const db = require("../config/db");
const Product = require("../models/productSchema");

module.exports.newProduct = async (productData) => {
  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports.updateProduct = async (productId, productData) => {
  try {
    const result = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports.deleteProduct = async (productId) => {
  try {
    const result = await Product.findByIdAndDelete(productId);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }
}