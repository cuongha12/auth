import userController from "../controller/userController";
import express from 'express';
import verifyToken from "../middleware/verifyToken";
import { isAdmin } from "../middleware/role";
const router = express.Router();

const authRouter = (app) => {
    router.get('/', verifyToken, userController.read)
    router.post('/register', userController.create)
    router.post('/login', userController.login)
    router.post('/refresh', userController.refresh)
    router.put('/user/:id', verifyToken, isAdmin, userController.update)
    router.delete('/user/:id', verifyToken, isAdmin, userController.delete)
    router.delete('/logout', verifyToken, userController.logout)
    return app.use('/auth', router);
}

export default authRouter