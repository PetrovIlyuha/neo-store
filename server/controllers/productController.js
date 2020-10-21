import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// * @desc Fetch all products
// ? @route GET /api/products
// ! @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// * @desc Fetch single product
// ? @route GET /api/products/:id
// ! @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// * @desc Delete single product
// ? @route DELETE /api/products/:id
// ! @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  if (product) {
    await product.remove();
    res.json({ message: "Product deleted from the database" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// * @desc Create single product
// ? @route POST /api/products/
// ! @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.png",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
      rating: 0,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: "Product creation had failed" });
    throw new Error(err);
  }
});

// * @desc Update single product
// ? @route PUT /api/products/:id
// ! @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product was not found in database");
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
