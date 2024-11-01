import express from "express";
import * as userContoller from "@/api/controllers/user-controllers/user-controller";
import * as complaintController from "@/api/controllers/user-controllers/complaint-controller";

const router = express.Router();

router.get("/users", userContoller.getAllUsers);
router.get("/users/:id", userContoller.getUserById);
router.get("/users/:id/activities", userContoller.getUserActivities);
router.get("/users/:id/historical-places", userContoller.getUserHistoricalPlaces);
router.get("/users/:id/products", userContoller.getUserProducts);
router.post("/users", userContoller.createUser);
router.patch("/users/:id", userContoller.updateUser);
router.delete("/users/:id", userContoller.deleteUser);
router.post("/users/login", userContoller.loginUser);

router.get("/complaints", complaintController.getAllComplaints);
router.get("/complaints/:ownerId", complaintController.getComplaintByOwner);
router.post("/complaints", complaintController.createComplaint);
router.patch("/complaints/:id", complaintController.updateComplaint);
router.post("/complaints/:id", complaintController.addReply);

export default router;
