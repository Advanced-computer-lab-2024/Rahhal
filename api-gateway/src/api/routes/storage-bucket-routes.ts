import express from 'express';
import * as storageBucketController from '@/api/controllers/storage-bucket-controller';


const router = express.Router();

router.post('/upload-file', storageBucketController.uploadFile);
router.post('/upload-multiple-files', storageBucketController.uploadMultipleFiles);

export default router;