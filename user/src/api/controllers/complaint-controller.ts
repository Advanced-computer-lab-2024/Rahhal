import type { Request, Response } from "express";
import * as complaintService from "@/services/complaint-service";
import { STATUS_CODES } from "@/utils/constants";

export async function getComplaints(req: Request, res: Response) {
  try {
    const complaints = await complaintService.getComplaints();
    if (!complaints) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "No complaints found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(complaints);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
}

export async function getComplaintsByOwner(req: Request, res: Response) {
  try {
    const ownerId = req.params.ownerId;
    const complaints = await complaintService.getComplaintsByOwner(ownerId);
    if (!complaints) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "No complaints found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(complaints);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
}

export async function createComplaint(req: Request, res: Response) {
  const complaint = req.body;
  try {
    const newComplaint = await complaintService.createComplaint(complaint);
    res.status(STATUS_CODES.CREATED).json(newComplaint);
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
}

export async function updateComplaint(req: Request, res: Response) {
  const complaintId = req.params.id;
  const status = req.body.status;
  try {
    const updatedComplaint = await complaintService.updateComplaint(complaintId, status);
    if (!updatedComplaint) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Complaint not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(updatedComplaint);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
}

export async function addReply(req: Request, res: Response) {
  const complaintId = req.params.complaintId;
  const reply = req.body.reply;
  try {
    const updatedComplaint = await complaintService.addReply(complaintId, reply);
    if (!updatedComplaint) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Complaint not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(updatedComplaint);
    }
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).send(error);
  }
}
