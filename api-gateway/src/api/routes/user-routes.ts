import express from "express";
import * as userContoller from "@/api/controllers/user-controllers/user-controller";
import * as complaintController from "@/api/controllers/user-controllers/complaint-controller";
import grantAccess, { Role } from "@/utils/auth";
const router = express.Router();

router.get("/users/number-of-users", userContoller.getNumberOfUsers);
router.get("/users", grantAccess([Role.ADMIN, Role.GUEST]), userContoller.getApprovedUsers);
router.get(
  "/users/requests",
  grantAccess([Role.ADMIN, Role.GUEST]),
  userContoller.getUsersPendingRequests,
);
router.get("/users/:id", userContoller.getUserById);
router.get(
  "/users/:id/activities",
  grantAccess([Role.ADVERTISER]),
  userContoller.getUserActivities,
);
router.get(
  "/users/:id/historical-places",
  grantAccess([Role.TOURISMGOVERNOR]),
  userContoller.getUserHistoricalPlaces,
);
router.get("/users/:id/products", grantAccess([Role.SELLER]), userContoller.getUserProducts);
router.patch(
  "/users/:id",
  grantAccess([
    Role.GUEST,
    Role.ADMIN,
    Role.ADVERTISER,
    Role.SELLER,
    Role.TOURGUIDE,
    Role.TOURISMGOVERNOR,
    Role.TOURIST,
  ]),
  userContoller.updateUser,
);
router.patch("/users/:id/redeem", grantAccess([Role.TOURIST]), userContoller.redeemPoints);

router.get("/complaints", grantAccess([Role.ADMIN]), complaintController.getAllComplaints);
router.get(
  "/complaints/:ownerId",
  grantAccess([Role.TOURIST]),
  complaintController.getComplaintByOwner,
);
router.post("/complaints", grantAccess([Role.TOURIST]), complaintController.createComplaint);
router.patch(
  "/complaints/:id",
  grantAccess([Role.TOURIST, Role.ADMIN]),
  complaintController.updateComplaint,
);
router.post("/complaints/:id", grantAccess([Role.ADMIN]), complaintController.addReply);

export default router;
