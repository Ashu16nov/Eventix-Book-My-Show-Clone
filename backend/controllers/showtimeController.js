import Showtime from '../models/Showtime.js';
import Seat from '../models/Seat.js';

export const getShowtimes = async (req, res) => {
    try {
        const { movie, cinema, date } = req.query;
        let query = {};
        
        if (movie) query.movie = movie;
        if (cinema) query.cinema = cinema;
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            query.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const showtimes = await Showtime.find(query)
            .populate('movie', 'title poster')
            .populate('cinema', 'name city')
            .populate('screen', 'name');
            
        res.json({ success: true, data: showtimes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getShowtimeById = async (req, res) => {
    try {
        const showtime = await Showtime.findById(req.params.id)
            .populate('movie')
            .populate('cinema')
            .populate('screen');
            
        if (showtime) {
            // Also fetch seats for this showtime
            const seats = await Seat.find({ showtime: req.params.id }).sort('seatNumber');
            res.json({ success: true, data: { showtime, seats } });
        } else {
            res.status(404).json({ success: false, message: 'Showtime not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin only
export const createShowtime = async (req, res) => {
    try {
        const showtime = await Showtime.create(req.body);
        res.status(201).json({ success: true, data: showtime });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
