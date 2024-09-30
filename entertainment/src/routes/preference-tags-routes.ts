import express from 'express';
import preferenceTagController from '../controllers/preference-tags-controller';

const router = express.Router();

router.get('/', preferenceTagController.getPreferenceTags);
router.get('/:id', preferenceTagController.getPreferenceTag);
router.post('/', preferenceTagController.createPreferenceTag);

export default router;
