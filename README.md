# Eventix - BookMyShow Clone
-------------------------------------------------------------------------

Eventix is a modern, responsive movie ticketing and event booking platform built with the MERN (MongoDB, Express, React, Node.js) stack. It is designed to replicate the core functionalities and sleek UI of popular ticketing platforms like BookMyShow.

## Features
- **Sleek, Modern UI**: High-quality design featuring dark mode, transparent overlays, and responsive carousels.
- **Movie Catalog**: View "Now Showing" and "Upcoming" movies with real-time dynamic AI-generated cinematic posters.
- **Admin Dashboard**: A comprehensive admin panel to view metrics, manage movies, events, and showtimes.
- **Responsive Layout**: Perfectly scaled movie cards and grids that adapt from mobile screens to large desktop monitors.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB (with fallback to `mongodb-memory-server` for easy local development without complex setups)

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Ashu16nov/Eventix-Book-My-Show-Clone.git
cd Eventix-Book-My-Show-Clone
```

### 2. Setup Backend
```bash
cd backend
npm install
npm start
```
*Note: The backend is configured to use an In-Memory MongoDB server if a primary MongoDB URI is not provided, meaning you can start developing immediately without configuring a database.*

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Database Seeding
To populate the database with initial sample data (movies, events, cinemas, etc.):
```bash
cd backend
node utils/seeder.js
```
*(If you are using the in-memory database, the seeder automatically runs when you start the server).*

## License
This project is open-source and available under the MIT License.
