import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts);
router.route('/top').get(getTopRatedProducts);
router.route('/:id').get(getProductById);
router.route('/:id').delete(protect, admin, deleteProduct);
router.route('/:id').put(protect, admin, updateProduct);
router.route('/:id/reviews').post(protect, createProductReview);

router.route('/').post(protect, admin, createProduct);
export default router;
