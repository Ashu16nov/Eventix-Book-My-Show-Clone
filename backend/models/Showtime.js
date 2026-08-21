import mongoose from 'mongoose';

const showtimeSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
    screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    basePrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Scheduled', 'Active', 'Cancelled', 'Completed'],
        default: 'Active'
    }
}, { timestamps: true });

// Prevent duplicate showtimes in the same screen at the same time
showtimeSchema.index({ screen: 1, date: 1, startTime: 1 }, { unique: true });

const Showtime = mongoose.model('Showtime', showtimeSchema);
export default Showtime;
