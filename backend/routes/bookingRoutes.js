import express from 'express';
import { createBooking, getUserBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getUserBookings)
    .post(protect, createBooking);

export default router;
