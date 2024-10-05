import express from 'express';
import * as historicalTagsController from '../controllers/historical-tags-controller';

const router = express.Router();

// HistoricalTags routes
router.get('/', historicalTagsController.getAllHistoricalTags);
router.get('/:id', historicalTagsController.getHistoricalTagById);
router.post('/', historicalTagsController.createHistoricalTag);

export default router;
