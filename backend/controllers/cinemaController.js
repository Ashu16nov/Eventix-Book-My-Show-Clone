import Cinema from '../models/Cinema.js';
import Screen from '../models/Screen.js';

export const getCinemas = async (req, res) => {
    try {
        const cinemas = await Cinema.find({});
        res.json({ success: true, data: cinemas });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getCinemaById = async (req, res) => {
    try {
        const cinema = await Cinema.findById(req.params.id);
        if (cinema) {
            const screens = await Screen.find({ cinema: cinema._id });
            res.json({ success: true, data: { cinema, screens } });
        } else {
            res.status(404).json({ success: false, message: 'Cinema not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin only
export const createCinema = async (req, res) => {
    try {
        const cinema = await Cinema.create(req.body);
        res.status(201).json({ success: true, data: cinema });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addScreen = async (req, res) => {
    try {
        const cinema = await Cinema.findById(req.params.cinemaId);
        if (!cinema) {
            return res.status(404).json({ success: false, message: 'Cinema not found' });
        }
        
        const screenData = { ...req.body, cinema: cinema._id };
        const screen = await Screen.create(screenData);
        
        res.status(201).json({ success: true, data: screen });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
