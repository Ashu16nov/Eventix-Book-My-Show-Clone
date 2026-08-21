import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    
    // Either movie or event will be populated
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true }
}, { timestamps: true });

// Prevent duplicate reviews for the same booking
reviewSchema.index({ user: 1, booking: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
