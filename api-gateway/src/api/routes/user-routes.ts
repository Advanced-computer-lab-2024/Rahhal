import express from 'express'
import * as userContoller from "@/api/controllers/user-controller"


const router =  express.Router();

router.get("/",userContoller.getAllUsers);
router.get("/:id",userContoller.getUserById);
router.post("/",userContoller.createUser);
router.patch("/:id",userContoller.updateUser);
router.delete("/:id",userContoller.deleteUser);

export default router