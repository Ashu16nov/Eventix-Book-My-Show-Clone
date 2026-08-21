import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    buttonText: { type: String },
    buttonLink: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
