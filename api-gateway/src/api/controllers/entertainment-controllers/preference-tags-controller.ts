import type { Request, Response } from "express";
import * as preferenceTagsService from "@/services/entertainment-services/preference-tags-service";
import { STATUS_CODES } from "@/utils/constants";

// PreferenceTags controllers
export async function getAllPreferenceTags(req: Request, res: Response) {
  try {
    const preferenceTag = await preferenceTagsService.getAllPreferenceTags();
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getPreferenceTagById(req: Request, res: Response) {
  const preferenceTagId = req.params.id;
  try {
    const preferenceTag = await preferenceTagsService.getPreferenceTagById(preferenceTagId);
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createPreferenceTag(req: Request, res: Response) {
  const preferenceTagData = req.body;
  try {
    const preferenceTag = await preferenceTagsService.createPreferenceTag(preferenceTagData);
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updatePreferenceTag(req: Request, res: Response) {
  const preferenceTagId = req.params.id;
  const preferenceTagData = req.body;
  try {
    const preferenceTag = await preferenceTagsService.updatePreferenceTag(preferenceTagId, preferenceTagData);
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deletePreferenceTag(req: Request, res: Response) {
  const preferenceTagId = req.params.id;
  try {
    const preferenceTag = await preferenceTagsService.deletePreferenceTag(preferenceTagId);
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
