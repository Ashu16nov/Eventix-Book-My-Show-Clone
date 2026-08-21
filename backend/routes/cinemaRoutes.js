import express from 'express';
import { getCinemas, getCinemaById, createCinema, addScreen } from '../controllers/cinemaController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getCinemas)
    .post(protect, admin, createCinema);

router.route('/:id')
    .get(getCinemaById);

router.route('/:cinemaId/screens')
    .post(protect, admin, addScreen);

export default router;
