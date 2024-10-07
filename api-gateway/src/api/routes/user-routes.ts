import express from "express";
import * as userContoller from "@/api/controllers/user-controller";

const router = express.Router();

router.get("/users", userContoller.getAllUsers);
router.get("/users/:id", userContoller.getUserById);
router.post("/users", userContoller.createUser);
router.patch("/users/:id", userContoller.updateUser);
router.delete("/users/:id", userContoller.deleteUser);

export default router;
