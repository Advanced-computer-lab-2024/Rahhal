import express from 'express';
import userController from '../controller/user-controller';


const router = express.Router();

router.get('/getUser', userController.getUserByUsername);
router.get('/getAllUsers', userController.getAllUsers);
router.put('/updateUser',userController.updateUserByUsername);


export default router; 