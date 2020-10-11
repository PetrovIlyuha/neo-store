import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// * @desc Create new order
// ? @route POST /api/orders
// ! @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  console.log(itemsPrice);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No items in order");
  } else {
    try {
      const newOrder = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        itemsPrice,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      let createdOrder = await newOrder.save();
      res.status(201).json(createdOrder);
    } catch (err) {
      console.log(req.user._id);
      res.status(401).json({ message: "Order creation failed" });
    }
  }
});

export { addOrderItems };
