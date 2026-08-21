import express from 'express';
import { getShowtimes, getShowtimeById, createShowtime } from '../controllers/showtimeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getShowtimes)
    .post(protect, admin, createShowtime);

router.route('/:id')
    .get(getShowtimeById);

export default router;
