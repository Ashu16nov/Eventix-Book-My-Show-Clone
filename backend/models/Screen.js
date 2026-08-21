import mongoose from 'mongoose';

const screenSchema = new mongoose.Schema({
    cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
    name: { type: String, required: true }, // e.g., Screen 1, Audi 3
    capacity: { type: Number, required: true },
    seatCategories: [{
        name: { type: String, required: true }, // e.g., VIP, Premium, Regular
        priceMultiplier: { type: Number, default: 1 } // e.g., 1.5 for VIP
    }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Screen = mongoose.model('Screen', screenSchema);
export default Screen;
