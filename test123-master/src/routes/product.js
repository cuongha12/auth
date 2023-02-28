import express from 'express';
import productController from '../controller/productController';
import verifyToken from '../middleware/verifyToken';
import { isAdmin } from '../middleware/role';
import upload from '../middleware/uploads';




const router = express.Router();

const productRouter = (app) => {
    router.get('/', productController.read)
    router.post('/', verifyToken, isAdmin, upload.single('File'), productController.create)
    router.put('/:id', verifyToken, isAdmin, upload.single('File'), productController.update)
    router.delete('/:id', verifyToken, isAdmin, productController.delete)
    return app.use('/product', router);
}

export default productRouter