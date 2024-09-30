import express from 'express';
import userController from '../controller/user-controller';


const router = express.Router();
// for user routes
router.get('/getUser/:id', userController.getUserById);
router.get('/getAllUsers', userController.getAllUsers);
router.put('/updateUser/:id',userController.updateUserById);

router.post('/createUser', userController.createUser);
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;
