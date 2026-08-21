import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import cinemaRoutes from './routes/cinemaRoutes.js';
import showtimeRoutes from './routes/showtimeRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ success: true, message: 'Eventix API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/cinemas', cinemaRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
