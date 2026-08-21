import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seatNumber: { type: String, required: true }, // e.g., A1, B4
    row: { type: String, required: true },
    column: { type: Number, required: true },
    category: { type: String, required: true }, // Should match a category in Screen
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Available', 'Booked', 'Blocked'],
        default: 'Available'
    },
    bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

// Compound index to ensure seat uniqueness per showtime
seatSchema.index({ showtime: 1, seatNumber: 1 }, { unique: true });

const Seat = mongoose.model('Seat', seatSchema);
export default Seat;
