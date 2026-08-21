import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
}, { timestamps: true });

// A user can only wishlist a specific movie or event once
wishlistSchema.index({ user: 1, movie: 1 }, { unique: true, partialFilterExpression: { movie: { $exists: true } } });
wishlistSchema.index({ user: 1, event: 1 }, { unique: true, partialFilterExpression: { event: { $exists: true } } });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;
