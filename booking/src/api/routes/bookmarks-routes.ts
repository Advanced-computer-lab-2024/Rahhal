import express from "express";
import * as bookmarkController from "@/api/controllers/bookmark-controller";

const router = express.Router();

router.get("/", bookmarkController.getBookmarks);
router.get("/:id", bookmarkController.getBookmarkById);
router.post("/", bookmarkController.createBookmark);
router.patch("/:id", bookmarkController.updateBookmark);
router.delete("/", bookmarkController.deleteBookmark);
router.delete("/:id", bookmarkController.deleteBookmarkById);

export default router;
