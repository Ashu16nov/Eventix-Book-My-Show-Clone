import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    bannerImage: { type: String, required: true },
    destinationUrl: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
export default Advertisement;
