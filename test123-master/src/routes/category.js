import express from 'express';
import categoryController from '../controller/categoryController';
import verifyToken from '../middleware/verifyToken';
import { isAdmin } from '../middleware/role';


const router = express.Router();

const categoryRouter = (app) => {
    router.get('/', verifyToken, isAdmin, categoryController.read)
    router.post('/', verifyToken, isAdmin, categoryController.create)
    router.put('/:id', verifyToken, isAdmin, categoryController.update)
    router.delete('/:id', verifyToken, isAdmin, categoryController.delete)
    return app.use('/category', router);
}

export default categoryRouter