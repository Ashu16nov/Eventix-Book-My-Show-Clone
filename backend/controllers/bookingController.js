import Booking from '../models/Booking.js';
import Seat from '../models/Seat.js';
import mongoose from 'mongoose';

export const createBooking = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { showtimeId, seatIds, bookingType, subtotal, totalAmount } = req.body;
        
        if (bookingType === 'Movie') {
            // Check if seats are available and lock them
            const seats = await Seat.find({ _id: { $in: seatIds }, showtime: showtimeId }).session(session);
            
            for (let seat of seats) {
                if (seat.status !== 'Available') {
                    throw new Error(`Seat ${seat.seatNumber} is no longer available.`);
                }
                seat.status = 'Booked';
                seat.bookedBy = req.user._id;
                await seat.save({ session });
            }

            const booking = await Booking.create([{
                bookingId: `EVX-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
                user: req.user._id,
                showtime: showtimeId,
                seats: seatIds,
                bookingType,
                subtotal,
                totalAmount
            }], { session });

            await session.commitTransaction();
            res.status(201).json({ success: true, data: booking[0] });
        } else {
            // Handle Event booking (no specific seats, just ticket quantity)
            // Implementation left basic for now as focus is movie
            throw new Error('Event booking not fully implemented yet');
        }
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ success: false, message: error.message });
    } finally {
        session.endSession();
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate({
                path: 'showtime',
                populate: { path: 'movie cinema screen' }
            })
            .populate('seats')
            .sort('-createdAt');
            
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id })
            .populate({
                path: 'showtime',
                populate: { path: 'movie cinema screen' }
            })
            .populate('seats');
            
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
            
        res.json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
