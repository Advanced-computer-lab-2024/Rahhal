import express from 'express';
import * as googleMapsController from '@/api/controllers/google-maps-controller';

const router = express.Router();

router.get("/autocomplete", googleMapsController.getPlaceAutocomplete);

export default router;
