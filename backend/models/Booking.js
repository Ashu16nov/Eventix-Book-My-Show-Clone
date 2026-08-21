import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    bookingId: { type: String, required: true, unique: true }, // e.g., EVX-2026-8F72K9
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Movie/Showtime reference (if it's a movie booking)
    showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' },
    seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
    
    // Event reference (if it's an event booking)
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    eventTickets: [{
        ticketType: { type: String }, // General, VIP
        quantity: { type: Number },
        pricePerTicket: { type: Number }
    }],

    bookingType: { type: String, enum: ['Movie', 'Event'], required: true },
    
    subtotal: { type: Number, required: true },
    convenienceFee: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    
    couponApplied: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', default: null },
    
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Confirmed'
    },
    paymentStatus: {
        type: String,
        enum: ['Demo - Not Required', 'Paid', 'Refunded'],
        default: 'Demo - Not Required'
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
