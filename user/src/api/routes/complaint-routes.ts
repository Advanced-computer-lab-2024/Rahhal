import express from "express";
import * as complaintController from "@/api/controllers/complaint-controller";

const router = express.Router();

router.get("/", complaintController.getComplaints);
router.get("/:ownerId", complaintController.getComplaintsByOwner);
router.post("/", complaintController.createComplaint);
router.patch("/:id", complaintController.updateComplaint);
router.post("/:complaintId", complaintController.addReply);

export default router;
