import express from 'express';

import { getProducts,
         createProduct, 
         updateProduct, 
         deleteProduct,
         createKeyword,
         searchProduct,
         getKeyword
        } from '../controllers/productController.js';

const router = express.Router();
 
router.get('/', getProducts);
router.post('/', createProduct);
router.patch('/item/:id',updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/search', searchProduct);
router.post('/keyword', createKeyword)
router.get('/keyword', getKeyword);

export default router;