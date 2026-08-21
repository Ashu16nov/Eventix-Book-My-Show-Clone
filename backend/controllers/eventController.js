import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json({ success: true, data: event });
        } else {
            res.status(404).json({ success: false, message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin only
export const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (event) {
            res.json({ success: true, data: event });
        } else {
            res.status(404).json({ success: false, message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (event) {
            res.json({ success: true, message: 'Event removed' });
        } else {
            res.status(404).json({ success: false, message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
