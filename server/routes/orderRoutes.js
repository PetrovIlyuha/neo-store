import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/myorders').get(protect, getUserOrders);
router.route('/').get(protect, admin, getAllOrders);
router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/delivered').put(protect, admin, updateOrderToDelivered);

export default router;
