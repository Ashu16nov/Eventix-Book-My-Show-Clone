import express from 'express';
import { createBooking, getUserBookings, getBookingById } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getUserBookings)
    .post(protect, createBooking);

router.route('/:id')
    .get(protect, getBookingById);

export default router;
