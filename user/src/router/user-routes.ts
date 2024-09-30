import express from 'express';
import userController from '../controller/user-controller';

const router = express.Router();

// for user routes
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

export default router;
