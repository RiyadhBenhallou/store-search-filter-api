import express from 'express';
import { getAllProductsStatic, getAllProducts } from '../controllers/products.js';

const router = express.Router();

router.get('/', getAllProducts)
router.get('/static', getAllProductsStatic)











export default router