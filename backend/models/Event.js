import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    poster: { type: String },
    banner: { type: String },
    description: { type: String },
    category: { 
        type: String, 
        enum: ['Concert', 'Comedy', 'Sports', 'Theatre', 'Workshop', 'Festival', 'Conference', 'Exhibition', 'Other'],
        required: true
    },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
    organizer: { type: String },
    ageLimit: { type: String, default: 'All Ages' },
    language: { type: String },
    terms: { type: String },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    },
    ticketTypes: [{
        name: { type: String, required: true }, // e.g. General, VIP
        price: { type: Number, required: true },
        totalQuantity: { type: Number, required: true },
        availableQuantity: { type: Number, required: true },
        description: { type: String }
    }]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
