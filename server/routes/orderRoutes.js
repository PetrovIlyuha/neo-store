import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getUserOrders,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/myorders").get(protect, getUserOrders);
router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
