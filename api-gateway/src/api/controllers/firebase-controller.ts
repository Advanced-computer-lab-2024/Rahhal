import type { Request, Response } from 'express';
import { STATUS_CODES } from '@/utils/constants';
import * as firebaseService from '@/services/firebase-service';
import fileUpload from 'express-fileupload';


export async function uploadFile(Request: Request, Response: Response) {

  const file = Request.files?.file as fileUpload.UploadedFile

  try {
    if(file === undefined){
      throw new Error('No file found');
    }
    const url = await firebaseService.uploadFile(file);

    Response.status(STATUS_CODES.STATUS_OK).json(url);
  } catch (error) {
    Response.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function uploadMultipleFiles(Request: Request, Response: Response) {

  const files = Request.files

  try {
    if(files === undefined || files === null){
      throw new Error('No files found');
    }

    const urls = await firebaseService.uploadMultipleFiles(convertFileArray(files));
    Response.status(STATUS_CODES.STATUS_OK).json(urls);
  } catch (error) {
    Response.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

function convertFileArray(files: fileUpload.FileArray): { [key: string]: fileUpload.UploadedFile } {
  const result: { [key: string]: fileUpload.UploadedFile } = {};

  for (const key in files) {
    const file = files[key];
    if (Array.isArray(file)) {
      throw new Error(`Unexpected array of files for key: ${key}`);
    }
    result[key] = file; // TypeScript infers file as UploadedFile here
  }

  return result;
}

