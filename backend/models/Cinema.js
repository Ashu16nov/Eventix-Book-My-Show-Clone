import mongoose from 'mongoose';

const cinemaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chain: { type: String }, // e.g., PVR, INOX
    city: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: Number,
        lng: Number
    },
    contact: { type: String },
    facilities: [{ type: String }], // e.g., Parking, Recliner, Dolby
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Cinema = mongoose.model('Cinema', cinemaSchema);
export default Cinema;
