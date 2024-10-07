import type express from "express";
import * as preferenceTagsService from "@/services/preference-tags-service";
import { STATUS_CODES } from "@/utils/constants";

export async function getPreferenceTags(req: express.Request, res: express.Response) {
  try {
    const preferenceTags = await preferenceTagsService.getPreferenceTags();
    res.status(STATUS_CODES.STATUS_OK).json(preferenceTags);
  } catch (error: unknown) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An error occurred" });
  }
}

export async function getPreferenceTag(req: express.Request, res: express.Response) {
  try {
    const id = req.params.id;
    const preferenceTag = await preferenceTagsService.getPreferenceTag(id);
    if (!preferenceTag) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "Preference Tag not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(preferenceTag);
    }
  } catch (error: unknown) {
    res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: error instanceof Error ? error.message : "An error occurred" });
  }
}

export async function createPreferenceTag(req: express.Request, res: express.Response) {
  try {
    const name = req.body.name;
    const prefTag = await preferenceTagsService.getPreferenceTagByName(name);
    if (prefTag) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: "Preference Tag already exists" });
    } else {
      const preferenceTag = await preferenceTagsService.createPreferenceTag(name);
      res.status(STATUS_CODES.CREATED).json(preferenceTag);
    }
  } catch (error: unknown) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An error occurred" });
  }
}

export async function updatePreferenceTag(req: express.Request, res: express.Response) {
  try {
    const id = req.params.id;
    const newName = req.body.name;
    const result = await preferenceTagsService.updatePreferenceTag(id, newName);
    if (result) {
      res.status(STATUS_CODES.STATUS_OK).json(result);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Preference Tag not found" });
    }
  } catch (error: unknown) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An error occurred" });
  }
}

export async function deletePreferenceTag(req: express.Request, res: express.Response) {
  try {
    const id = req.params.id;
    const result = await preferenceTagsService.deletePreferenceTag(id);
    if (result) {
      res.status(STATUS_CODES.STATUS_OK).json(result);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Preference Tag not found" });
    }
  } catch (error: unknown) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: error instanceof Error ? error.message : "An error occurred" });
  }
}
