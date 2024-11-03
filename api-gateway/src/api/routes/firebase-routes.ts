import express from 'express';
import * as firebaseController from '@/api/controllers/firebase-controller';


const router = express.Router();

router.post('/upload-file', firebaseController.uploadFile);
router.post('/upload-multiple-files', firebaseController.uploadMultipleFiles);

export default router;