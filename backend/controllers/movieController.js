import Movie from '../models/Movie.js';

export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json({ success: true, data: movies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.json({ success: true, data: movie });
        } else {
            res.status(404).json({ success: false, message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin only
export const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({ success: true, data: movie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (movie) {
            res.json({ success: true, data: movie });
        } else {
            res.status(404).json({ success: false, message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (movie) {
            res.json({ success: true, message: 'Movie removed' });
        } else {
            res.status(404).json({ success: false, message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
