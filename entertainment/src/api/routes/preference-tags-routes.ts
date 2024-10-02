import express from "express";
import * as preferenceTagController from "@/api/controllers/preference-tags-controller";

const router = express.Router();

router.get("/", preferenceTagController.getPreferenceTags);
router.get("/:id", preferenceTagController.getPreferenceTag);
router.post("/", preferenceTagController.createPreferenceTag);
router.patch("/:id", preferenceTagController.updatePreferenceTag);
router.delete("/:id", preferenceTagController.deletePreferenceTag);

export default router;
