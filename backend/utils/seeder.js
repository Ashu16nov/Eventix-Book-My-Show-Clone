import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Event from '../models/Event.js';
import Cinema from '../models/Cinema.js';
import Screen from '../models/Screen.js';
import Showtime from '../models/Showtime.js';
import Seat from '../models/Seat.js';
import Coupon from '../models/Coupon.js';
import Advertisement from '../models/Advertisement.js';
import Banner from '../models/Banner.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const importData = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await connectDB();
        }
        
        await User.deleteMany();
        await Movie.deleteMany();
        await Event.deleteMany();
        await Cinema.deleteMany();
        await Screen.deleteMany();
        await Showtime.deleteMany();
        await Seat.deleteMany();
        await Coupon.deleteMany();
        await Advertisement.deleteMany();
        await Banner.deleteMany();

        // Admin User
        const salt = await bcrypt.genSalt(10);
        const hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', salt);
        
        const adminUser = await User.create({
            name: 'Admin',
            email: process.env.ADMIN_EMAIL || 'admin@eventix.com',
            password: hashedAdminPassword,
            role: 'admin',
        });

        // Demo User
        const hashedUserPassword = await bcrypt.hash('user123', salt);
        const demoUser = await User.create({
            name: 'John Doe',
            email: 'user@eventix.com',
            password: hashedUserPassword,
        });

        // Movies
        const movies = await Movie.insertMany([
            {
                title: 'Stree 2',
                poster: 'https://upload.wikimedia.org/wikipedia/en/3/30/Stree_2_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1572456456070-7617b0d0dc52?q=80&w=1280',
                description: 'The town of Chanderi is being haunted again. This time, women are mysteriously abducted by a terrifying headless entity.',
                genre: ['Comedy', 'Horror'],
                language: ['Hindi'],
                duration: 149,
                releaseDate: new Date('2024-08-15'),
                certificate: 'U/A',
                director: 'Amar Kaushik',
                cast: ['Shraddha Kapoor', 'Rajkummar Rao', 'Pankaj Tripathi'],
                rating: 8.6,
                status: 'Now Showing'
            },
            {
                title: 'Fighter',
                poster: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Fighter_film_teaser.jpg',
                banner: 'https://images.unsplash.com/photo-1544723049-3fb7cfad9a95?q=80&w=1280',
                description: 'Top IAF aviators come together in the face of imminent danger, to form Air Dragons.',
                genre: ['Action', 'Thriller'],
                language: ['Hindi'],
                duration: 166,
                releaseDate: new Date('2024-01-25'),
                certificate: 'U/A',
                director: 'Siddharth Anand',
                cast: ['Hrithik Roshan', 'Deepika Padukone', 'Anil Kapoor'],
                rating: 7.5,
                status: 'Now Showing'
            },
            {
                title: 'Hanu-Man',
                poster: 'https://upload.wikimedia.org/wikipedia/en/b/bb/Hanu_Man_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1280',
                description: 'An imaginary place called Anjanadri where the protagonist gets the powers of Hanuman and fights for Anjanadri.',
                genre: ['Action', 'Adventure', 'Fantasy'],
                language: ['Telugu', 'Hindi'],
                duration: 158,
                releaseDate: new Date('2024-01-12'),
                certificate: 'U/A',
                director: 'Prasanth Varma',
                cast: ['Teja Sajja', 'Amritha Aiyer'],
                rating: 8.4,
                status: 'Now Showing'
            },
            {
                title: 'Shaitaan',
                poster: 'https://upload.wikimedia.org/wikipedia/en/a/af/Shaitaan_2024_film_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=1280',
                description: 'A timeless tale of battle between good and evil with a family embodying the forces of righteousness while a man symbolizes malevolence.',
                genre: ['Thriller', 'Horror'],
                language: ['Hindi'],
                duration: 132,
                releaseDate: new Date('2024-03-08'),
                certificate: 'U/A',
                director: 'Vikas Bahl',
                cast: ['Ajay Devgn', 'R. Madhavan', 'Jyothika'],
                rating: 7.7,
                status: 'Now Showing'
            },
            {
                title: 'Jawan',
                poster: 'https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1280',
                description: 'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.',
                genre: ['Action', 'Thriller'],
                language: ['Hindi', 'Tamil', 'Telugu'],
                duration: 169,
                releaseDate: new Date('2023-09-07'),
                certificate: 'U/A',
                director: 'Atlee',
                cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
                rating: 8.2,
                status: 'Now Showing'
            },
            {
                title: 'Kalki 2898 AD',
                poster: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1280',
                description: 'A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.',
                genre: ['Sci-Fi', 'Action'],
                language: ['Telugu', 'Hindi', 'Tamil'],
                duration: 181,
                releaseDate: new Date('2024-06-27'),
                certificate: 'U/A',
                director: 'Nag Ashwin',
                cast: ['Prabhas', 'Amitabh Bachchan', 'Deepika Padukone'],
                rating: 8.5,
                status: 'Now Showing'
            },
            {
                title: 'Animal',
                poster: 'https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=1280',
                description: 'A son\'s obsessive love for his father leads him down a dark path of vengeance.',
                genre: ['Action', 'Crime', 'Drama'],
                language: ['Hindi', 'Telugu'],
                duration: 201,
                releaseDate: new Date('2023-12-01'),
                certificate: 'A',
                director: 'Sandeep Reddy Vanga',
                cast: ['Ranbir Kapoor', 'Anil Kapoor', 'Bobby Deol'],
                rating: 7.9,
                status: 'Now Showing'
            },
            {
                title: 'Salaar: Part 1 - Ceasefire',
                poster: 'https://upload.wikimedia.org/wikipedia/en/4/42/Salaar_Part_1_%E2%80%93_Ceasefire_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1280',
                description: 'A gang leader makes a promise to a dying friend and takes on other criminal gangs.',
                genre: ['Action', 'Crime'],
                language: ['Telugu', 'Hindi', 'Kannada'],
                duration: 175,
                releaseDate: new Date('2023-12-22'),
                certificate: 'A',
                director: 'Prashanth Neel',
                cast: ['Prabhas', 'Prithviraj Sukumaran', 'Shruti Haasan'],
                rating: 8.1,
                status: 'Now Showing'
            },
            {
                title: 'Pushpa 2: The Rule',
                poster: 'https://upload.wikimedia.org/wikipedia/en/1/11/Pushpa_2_The_Rule_Poster.jpg',
                banner: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=1280',
                description: 'The clash between Pushpa and Bhanwar Singh continues in this epic sequel.',
                genre: ['Action', 'Drama'],
                language: ['Telugu', 'Hindi', 'Tamil'],
                duration: 180,
                releaseDate: new Date('2024-08-15'),
                certificate: 'U/A',
                director: 'Sukumar',
                cast: ['Allu Arjun', 'Fahadh Faasil', 'Rashmika Mandanna'],
                rating: 8.8,
                status: 'Coming Soon'
            },
            {
                title: 'Leo',
                poster: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Leo_2023_Poster.jpg',
                banner: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1280',
                description: 'A mild-mannered cafe owner gets caught up with a drug cartel and must protect his family.',
                genre: ['Action', 'Thriller'],
                language: ['Tamil', 'Hindi', 'Telugu'],
                duration: 164,
                releaseDate: new Date('2023-10-19'),
                certificate: 'U/A',
                director: 'Lokesh Kanagaraj',
                cast: ['Vijay', 'Sanjay Dutt', 'Trisha'],
                rating: 8.0,
                status: 'Now Showing'
            },
            {
                title: 'Pathaan',
                poster: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1565153907400-7e01a9ab25f3?q=80&w=1280',
                description: 'An exiled RAW agent must stop an ex-agent from destroying India with a deadly virus.',
                genre: ['Action', 'Thriller'],
                language: ['Hindi', 'Tamil', 'Telugu'],
                duration: 146,
                releaseDate: new Date('2023-01-25'),
                certificate: 'U/A',
                director: 'Siddharth Anand',
                cast: ['Shah Rukh Khan', 'Deepika Padukone', 'John Abraham'],
                rating: 7.8,
                status: 'Now Showing'
            },
            {
                title: 'Avengers: Doomsday',
                poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Avengers_Endgame_poster.jpg/220px-Avengers_Endgame_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1280',
                description: 'The Avengers face their greatest threat yet as Doctor Doom emerges.',
                genre: ['Action', 'Sci-Fi'],
                language: ['English', 'Hindi', 'Tamil', 'Telugu'],
                duration: 160,
                releaseDate: new Date('2026-12-18'),
                certificate: 'U/A',
                director: 'Anthony and Joe Russo',
                cast: ['Robert Downey Jr.', 'Pedro Pascal', 'Vanessa Kirby'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'Dune: Part Three',
                poster: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_Part_Two_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1280',
                description: 'Paul Atreides faces the ultimate holy war across the universe in the epic conclusion.',
                genre: ['Sci-Fi', 'Adventure'],
                language: ['English', 'Hindi'],
                duration: 170,
                releaseDate: new Date('2026-12-18'),
                certificate: 'U/A',
                director: 'Denis Villeneuve',
                cast: ['Timothée Chalamet', 'Zendaya', 'Florence Pugh'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'Ramayana',
                poster: 'https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1280',
                description: 'An epic adaptation of the ancient Indian mythological saga.',
                genre: ['Action', 'Mythology', 'Drama'],
                language: ['Hindi', 'Telugu', 'Tamil'],
                duration: 180,
                releaseDate: new Date('2026-11-08'),
                certificate: 'U/A',
                director: 'Nitesh Tiwari',
                cast: ['Ranbir Kapoor', 'Sai Pallavi', 'Yash'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'Drishyam 3',
                poster: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Drishyam_2_2022_film_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1565153907400-7e01a9ab25f3?q=80&w=1280',
                description: 'The final chapter in Georgekutty\'s thrilling saga to protect his family.',
                genre: ['Thriller', 'Crime'],
                language: ['Malayalam', 'Hindi'],
                duration: 150,
                releaseDate: new Date('2026-05-21'),
                certificate: 'U/A',
                director: 'Jeethu Joseph',
                cast: ['Mohanlal', 'Asha Sharath', 'Siddique'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'Jailer 2',
                poster: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Jailer_2023_Tamil_film_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?q=80&w=1280',
                description: 'Muthuvel Pandian returns for another action-packed mission.',
                genre: ['Action', 'Thriller'],
                language: ['Tamil', 'Telugu', 'Hindi'],
                duration: 165,
                releaseDate: new Date('2026-10-15'),
                certificate: 'U/A',
                director: 'Nelson Dilipkumar',
                cast: ['Rajinikanth', 'Ramya Krishnan', 'Fahadh Faasil'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'Toxic',
                poster: 'https://upload.wikimedia.org/wikipedia/en/4/42/Salaar_Part_1_%E2%80%93_Ceasefire_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=1280',
                description: 'A gritty underworld action drama set in the Goan drug cartel world.',
                genre: ['Action', 'Crime'],
                language: ['Kannada', 'Hindi'],
                duration: 155,
                releaseDate: new Date('2026-08-26'),
                certificate: 'A',
                director: 'Geetu Mohandas',
                cast: ['Yash', 'Kiara Advani', 'Nayanthara'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'The Paradise',
                poster: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=600',
                banner: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1280',
                description: 'A breathtaking romantic drama set in the lush landscapes of Kashmir.',
                genre: ['Romance', 'Drama'],
                language: ['Hindi'],
                duration: 140,
                releaseDate: new Date('2026-02-14'),
                certificate: 'U',
                director: 'Imtiaz Ali',
                cast: ['Triptii Dimri', 'Kartik Aaryan'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'Spirit',
                poster: 'https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1280',
                description: 'A righteous cop takes on the criminal underworld in this violent action saga.',
                genre: ['Action', 'Drama'],
                language: ['Telugu', 'Hindi'],
                duration: 175,
                releaseDate: new Date('2027-03-05'),
                certificate: 'A',
                director: 'Sandeep Reddy Vanga',
                cast: ['Prabhas', 'Triptii Dimri', 'Vivek Oberoi'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'Brahmastra Part 2',
                poster: 'https://upload.wikimedia.org/wikipedia/en/4/40/Brahmastra_Teaser_Poster.jpeg',
                banner: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1280',
                description: 'The next chapter of the Astraverse saga following Shiva and Isha\'s journey.',
                genre: ['Fantasy', 'Action'],
                language: ['Hindi', 'Telugu'],
                duration: 165,
                releaseDate: new Date('2027-12-25'),
                certificate: 'U/A',
                director: 'Ayan Mukerji',
                cast: ['Ranbir Kapoor', 'Alia Bhatt'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'Avengers: Secret Wars',
                poster: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1280',
                description: 'The epic finale of the Multiverse Saga where worlds collide.',
                genre: ['Action', 'Sci-Fi'],
                language: ['English', 'Hindi', 'Tamil', 'Telugu'],
                duration: 185,
                releaseDate: new Date('2027-12-17'),
                certificate: 'U/A',
                director: 'Anthony and Joe Russo',
                cast: ['Robert Downey Jr.', 'Pedro Pascal', 'Chris Evans'],
                rating: 0,
                status: 'Coming Soon'
            },
            {
                title: 'The Mandalorian & Grogu',
                poster: 'https://upload.wikimedia.org/wikipedia/en/3/37/The_Mandalorian_season_3_poster.jpg',
                banner: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1280',
                description: 'Din Djarin and Grogu embark on a new cinematic adventure across the galaxy.',
                genre: ['Sci-Fi', 'Adventure'],
                language: ['English'],
                duration: 140,
                releaseDate: new Date('2026-05-22'),
                certificate: 'U/A',
                director: 'Jon Favreau',
                cast: ['Pedro Pascal', 'Sigourney Weaver', 'Jeremy Allen White'],
                rating: 0,
                status: 'Coming Soon'
            }
        ]);

        // Events
        const events = await Event.insertMany([
            {
                title: 'Tech Conference 2026',
                category: 'Conference',
                venue: 'Global Trade Center',
                city: 'Bangalore',
                date: new Date('2026-10-15'),
                startTime: '09:00',
                ticketTypes: [
                    { name: 'Standard Pass', price: 999, totalQuantity: 500, availableQuantity: 500 },
                    { name: 'VIP Pass', price: 2999, totalQuantity: 100, availableQuantity: 100 }
                ]
            }
        ]);

        // Cinemas
        const cinemas = await Cinema.insertMany([
            {
                name: 'PVR Director\'s Cut',
                chain: 'PVR',
                city: 'Delhi',
                address: 'Ambience Mall, Vasant Kunj',
                facilities: ['Recliner', 'Dolby Atmos', 'Food']
            }
        ]);

        // Screens
        const screens = await Screen.insertMany([
            {
                cinema: cinemas[0]._id,
                name: 'Audi 1',
                capacity: 64,
                seatCategories: [
                    { name: 'Regular', priceMultiplier: 1 },
                    { name: 'Premium', priceMultiplier: 1.5 }
                ]
            }
        ]);

        // Showtimes
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const showtime = await Showtime.create({
            movie: movies[0]._id,
            cinema: cinemas[0]._id,
            screen: screens[0]._id,
            date: tomorrow,
            startTime: '19:00',
            endTime: '22:00',
            basePrice: 300
        });

        // Seats for Showtime (8x8 Grid)
        const seatsToCreate = [];
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        for (let i = 0; i < 8; i++) {
            for (let j = 1; j <= 8; j++) {
                let category = i < 4 ? 'Regular' : 'Premium';
                let price = category === 'Regular' ? showtime.basePrice : showtime.basePrice * 1.5;
                
                seatsToCreate.push({
                    showtime: showtime._id,
                    seatNumber: `${rows[i]}${j}`,
                    row: rows[i],
                    column: j,
                    category: category,
                    price: price
                });
            }
        }
        await Seat.insertMany(seatsToCreate);

        // Coupons
        await Coupon.create({
            code: 'WELCOME50',
            discountType: 'percentage',
            discountValue: 50,
            maximumDiscount: 150,
            expiryDate: new Date('2026-12-31')
        });

        console.log('Data Imported!');
    } catch (error) {
        console.error(`${error}`);
    }
};

export default importData;

if (process.argv[1] && process.argv[1].includes('seeder')) {
    importData().then(() => process.exit());
}
