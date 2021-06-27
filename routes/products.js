import express from 'express';

import { getProducts,
         createProduct, 
         updateProduct, 
         deleteProduct,
         
         searchProduct,
        } from '../controllers/productController.js';

const router = express.Router();
 
router.get('/', getProducts);
router.post('/', createProduct);
router.patch('/item/:id',updateProduct);
router.delete('/item/:id', deleteProduct);
router.get('/search', searchProduct);


export default router;