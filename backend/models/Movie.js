import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    poster: { type: String },
    banner: { type: String },
    description: { type: String },
    genre: [{ type: String }],
    language: [{ type: String }],
    duration: { type: Number }, // in minutes
    releaseDate: { type: Date },
    certificate: { type: String }, // e.g. U/A, A
    director: { type: String },
    cast: [{ type: String }],
    trailer: { type: String },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['Coming Soon', 'Now Showing', 'Ended'],
        default: 'Now Showing'
    }
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
