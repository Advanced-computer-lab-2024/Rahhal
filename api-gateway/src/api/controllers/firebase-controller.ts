import type { Request, Response } from 'express';
import { STATUS_CODES } from '@/utils/constants';
import * as firebaseService from '@/services/firebase-service';


export async function uploadFile(Request: Request, Response: Response) {

  const file = Request.files.file;
  
  try {
    const url = await firebaseService.uploadFile(file);
    Response.status(STATUS_CODES.STATUS_OK).json(url);
  } catch (error) {
    Response.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function uploadMultipleFiles(Request: Request, Response: Response) {
  const files = Request.files;
  try {
    const urls = await firebaseService.uploadMultipleFiles(files);
    Response.status(STATUS_CODES.STATUS_OK).json(urls);
  } catch (error) {
    Response.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

