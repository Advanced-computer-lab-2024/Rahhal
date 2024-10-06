import express from 'express';
import userController from '../controllers/user-controller';


const router = express.Router();
// for user routes
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.patch('/:id',userController.updateUserById);

router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

export default router;
