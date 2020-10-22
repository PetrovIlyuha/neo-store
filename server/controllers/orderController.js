import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

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
    throw new Error('No items in order');
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
      res.status(401).json({ message: 'Order creation failed' });
    }
  }
});

// * @desc Get order by id
// ? @route GET /api/orders/:id
// ! access Protected
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email',
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// * @desc Update order to paid status
// ? @route PUT /api/orders/:id/pay
// ! @access Protected
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// * @desc Update order to delivered status
// ? @route PUT /api/orders/:id/delivered
// ! @access Protected/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// * @desc Get currently logged in user's orders
// ? @route GET /api/orders/myorders
// ! @access Protected
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// * @desc GET All orders
// ? @route GET /api/orders/
// ! @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  if (orders) {
    res.json(orders);
  } else {
    res
      .status(422)
      .json({ message: 'Unprocessable orders request. Try again' });
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getAllOrders,
  updateOrderToDelivered,
};
