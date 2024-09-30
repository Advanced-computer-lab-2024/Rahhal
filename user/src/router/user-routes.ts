import express from 'express';
import userController from '../controller/user-controller';


const router = express.Router();
// for user routes
router.get('/getUser', userController.getUserByUsername);
router.get('/getAllUsers', userController.getAllUsers);
router.put('/updateUser',userController.updateUserByUsername);

router.post('/createUser', userController.createUser);
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;
