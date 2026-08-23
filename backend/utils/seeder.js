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
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Stree%202%20hindi%20comedy%20horror?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Stree%202%20hindi%20horror?width=1280&height=720&nologo=true',
                description: 'The town of Chanderi is being haunted again. This time, women are mysteriously abducted by a terrifying headless entity.',
                genre: ['Comedy', 'Horror'],
                language: ['Hindi'],
                duration: 149,
                releaseDate: new Date('2024-08-15'),
                certificate: 'U/A',
                director: 'Amar Kaushik',
                cast: ['Shraddha Kapoor', 'Rajkummar Rao', 'Pankaj Tripathi'],
                rating: 8.6,
                status: 'Past'
            },
            {
                title: 'Fighter',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Fighter%20hindi%20action%20airforce?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Fighter%20hindi%20action%20airforce?width=1280&height=720&nologo=true',
                description: 'Top IAF aviators come together in the face of imminent danger, to form Air Dragons.',
                genre: ['Action', 'Thriller'],
                language: ['Hindi'],
                duration: 166,
                releaseDate: new Date('2024-01-25'),
                certificate: 'U/A',
                director: 'Siddharth Anand',
                cast: ['Hrithik Roshan', 'Deepika Padukone', 'Anil Kapoor'],
                rating: 7.5,
                status: 'Past'
            },
            {
                title: 'Hanu-Man',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Hanu-Man%20telugu%20superhero?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Hanu-Man%20telugu%20superhero?width=1280&height=720&nologo=true',
                description: 'An imaginary place called Anjanadri where the protagonist gets the powers of Hanuman and fights for Anjanadri.',
                genre: ['Action', 'Adventure', 'Fantasy'],
                language: ['Telugu', 'Hindi'],
                duration: 158,
                releaseDate: new Date('2024-01-12'),
                certificate: 'U/A',
                director: 'Prasanth Varma',
                cast: ['Teja Sajja', 'Amritha Aiyer'],
                rating: 8.4,
                status: 'Past'
            },
            {
                title: 'Shaitaan',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Shaitaan%20hindi%20horror%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Shaitaan%20hindi%20horror%20movie?width=1280&height=720&nologo=true',
                description: 'A timeless tale of battle between good and evil with a family embodying the forces of righteousness while a man symbolizes malevolence.',
                genre: ['Thriller', 'Horror'],
                language: ['Hindi'],
                duration: 132,
                releaseDate: new Date('2024-03-08'),
                certificate: 'U/A',
                director: 'Vikas Bahl',
                cast: ['Ajay Devgn', 'R. Madhavan', 'Jyothika'],
                rating: 7.7,
                status: 'Past'
            },
            {
                title: 'Jawan',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Jawan%20hindi%20action%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Jawan%20hindi%20action%20movie?width=1280&height=720&nologo=true',
                description: 'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.',
                genre: ['Action', 'Thriller'],
                language: ['Hindi', 'Tamil', 'Telugu'],
                duration: 169,
                releaseDate: new Date('2023-09-07'),
                certificate: 'U/A',
                director: 'Atlee',
                cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
                rating: 8.2,
                status: 'Past'
            },
            {
                title: 'Kalki 2898 AD',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Kalki%202898%20AD%20telugu%20sci-fi?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Kalki%202898%20AD%20telugu%20sci-fi?width=1280&height=720&nologo=true',
                description: 'A modern-day avatar of Vishnu, a Hindu god, who is believed to have descended to earth to protect the world from evil forces.',
                genre: ['Sci-Fi', 'Action'],
                language: ['Telugu', 'Hindi', 'Tamil'],
                duration: 181,
                releaseDate: new Date('2024-06-27'),
                certificate: 'U/A',
                director: 'Nag Ashwin',
                cast: ['Prabhas', 'Amitabh Bachchan', 'Deepika Padukone'],
                rating: 8.5,
                status: 'Past'
            },
            {
                title: 'Animal',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Animal%20hindi%20action%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Animal%20hindi%20action%20movie?width=1280&height=720&nologo=true',
                description: 'A son\'s obsessive love for his father leads him down a dark path of vengeance.',
                genre: ['Action', 'Crime', 'Drama'],
                language: ['Hindi', 'Telugu'],
                duration: 201,
                releaseDate: new Date('2023-12-01'),
                certificate: 'A',
                director: 'Sandeep Reddy Vanga',
                cast: ['Ranbir Kapoor', 'Anil Kapoor', 'Bobby Deol'],
                rating: 7.9,
                status: 'Past'
            },
            {
                title: 'Salaar: Part 1 - Ceasefire',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Salaar%20action%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Salaar%20action%20movie?width=1280&height=720&nologo=true',
                description: 'A gang leader makes a promise to a dying friend and takes on other criminal gangs.',
                genre: ['Action', 'Crime'],
                language: ['Telugu', 'Hindi', 'Kannada'],
                duration: 175,
                releaseDate: new Date('2023-12-22'),
                certificate: 'A',
                director: 'Prashanth Neel',
                cast: ['Prabhas', 'Prithviraj Sukumaran', 'Shruti Haasan'],
                rating: 8.1,
                status: 'Past'
            },

            {
                title: 'Leo',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Leo%20tamil%20action%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Leo%20tamil%20action%20movie?width=1280&height=720&nologo=true',
                description: 'A mild-mannered cafe owner gets caught up with a drug cartel and must protect his family.',
                genre: ['Action', 'Thriller'],
                language: ['Tamil', 'Hindi', 'Telugu'],
                duration: 164,
                releaseDate: new Date('2023-10-19'),
                certificate: 'U/A',
                director: 'Lokesh Kanagaraj',
                cast: ['Vijay', 'Sanjay Dutt', 'Trisha'],
                rating: 8.0,
                status: 'Past'
            },
            {
                title: 'Pathaan',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Pathaan%20hindi%20action%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Pathaan%20hindi%20action%20movie?width=1280&height=720&nologo=true',
                description: 'An exiled RAW agent must stop an ex-agent from destroying India with a deadly virus.',
                genre: ['Action', 'Thriller'],
                language: ['Hindi', 'Tamil', 'Telugu'],
                duration: 146,
                releaseDate: new Date('2023-01-25'),
                certificate: 'U/A',
                director: 'Siddharth Anand',
                cast: ['Shah Rukh Khan', 'Deepika Padukone', 'John Abraham'],
                rating: 7.8,
                status: 'Past'
            },
            {
                title: 'Avengers: Doomsday',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Avengers%20Doomsday%20marvel%20superhero%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Avengers%20Doomsday%20marvel?width=1280&height=720&nologo=true',
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
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Dune%20Part%20Three%20sci-fi%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Dune%20Part%20Three%20desert%20sci-fi?width=1280&height=720&nologo=true',
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
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Ramayana%20indian%20mythological%20epic%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Ramayana%20epic%20mythology?width=1280&height=720&nologo=true',
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
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Drishyam%203%20malayalam%20thriller?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Drishyam%203%20thriller?width=1280&height=720&nologo=true',
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
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Jailer%202%20tamil%20action%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Jailer%202%20action?width=1280&height=720&nologo=true',
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
                title: 'The Paradise',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20The%20Paradise%20romantic%20drama%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20The%20Paradise%20romantic%20kashmir?width=1280&height=720&nologo=true',
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
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Spirit%20telugu%20action%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Spirit%20telugu%20movie?width=1280&height=720&nologo=true',
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
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Brahmastra%20Part%202%20fantasy%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Brahmastra%20Part%202%20fantasy?width=1280&height=720&nologo=true',
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
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Avengers%20Secret%20Wars%20marvel%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Avengers%20Secret%20Wars%20marvel?width=1280&height=720&nologo=true',
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
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20The%20Mandalorian%20And%20Grogu%20star%20wars%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20The%20Mandalorian%20And%20Grogu%20star%20wars?width=1280&height=720&nologo=true',
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
            },
            {
                title: 'Awarapan 2',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Awarapan%202%20hindi%20movie%20action%20thriller?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Awarapan%202%20hindi%20movie?width=1280&height=720&nologo=true',
                description: 'The intense sequel to the cult classic action thriller.',
                genre: ['Action', 'Thriller'],
                language: ['Hindi'],
                duration: 145,
                releaseDate: new Date('2026-08-14'),
                certificate: 'A',
                director: 'Nitin Kakkar',
                cast: ['Emraan Hashmi', 'Disha Patani', 'Shabana Azmi'],
                rating: 0,
                status: 'Now Showing'
            },
            {
                title: 'Khalifa – The Ruler',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Khalifa%20The%20Ruler%20malayalam%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Khalifa%20The%20Ruler?width=1280&height=720&nologo=true',
                description: 'A powerful ruler must face unexpected betrayals in this epic Malayalam saga.',
                genre: ['Drama', 'Action'],
                language: ['Malayalam'],
                duration: 155,
                releaseDate: new Date('2026-08-19'),
                certificate: 'U/A',
                director: 'Vysakh',
                cast: ['Prithviraj Sukumaran', 'Malvika Sharma', 'Mohanlal'],
                rating: 0,
                status: 'Now Showing'
            },
            {
                title: 'Irumudi',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Irumudi%20telugu%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Irumudi%20telugu%20movie?width=1280&height=720&nologo=true',
                description: 'A gripping Telugu drama exploring the depths of tradition and modern conflicts.',
                genre: ['Drama', 'Action'],
                language: ['Telugu'],
                duration: 140,
                releaseDate: new Date('2026-08-21'),
                certificate: 'U/A',
                director: 'Shiva Nirvana',
                cast: ['Ravi Teja', 'Priya Bhavani Shankar', 'Sai Kumar'],
                rating: 0,
                status: 'Now Showing'
            },
            {
                title: 'Magudam',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Magudam%20tamil%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Magudam%20tamil%20movie?width=1280&height=720&nologo=true',
                description: 'An action-packed Tamil film about power, royalty, and justice.',
                genre: ['Action', 'Thriller'],
                language: ['Tamil'],
                duration: 150,
                releaseDate: new Date('2026-08-14'),
                certificate: 'U/A',
                director: 'Vishal',
                cast: ['Vishal', 'Anjali', 'Dushara Vijayan'],
                rating: 0,
                status: 'Now Showing'
            },
            {
                title: 'Insidious: Out of The Further',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Insidious%20Out%20of%20The%20Further%20horror%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Insidious%20horror%20movie?width=1280&height=720&nologo=true',
                description: 'The terrifying next chapter takes you deeper into The Further than ever before.',
                genre: ['Horror', 'Thriller'],
                language: ['English'],
                duration: 120,
                releaseDate: new Date('2026-08-21'),
                certificate: 'A',
                director: 'Jacob Chase',
                cast: ['Amelia Eve', 'Brandon Perea', 'Lin Shaye'],
                rating: 0,
                status: 'Now Showing'
            },
            {
                title: 'Batwara 1947',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Batwara%201947%20hindi%20movie%20historical?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Batwara%201947%20historical?width=1280&height=720&nologo=true',
                description: 'A heart-wrenching historical drama set during the partition of India.',
                genre: ['History', 'Drama'],
                language: ['Hindi'],
                duration: 165,
                releaseDate: new Date('2026-08-14'),
                certificate: 'U/A',
                director: 'Rajkumar Santoshi',
                cast: ['Sunny Deol', 'Preity Zinta', 'Shabana Azmi'],
                rating: 0,
                status: 'Now Showing'
            },
            {
                title: 'Bethlehem Kudumba Unit',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Bethlehem%20Kudumba%20Unit%20malayalam%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Bethlehem%20Kudumba%20Unit?width=1280&height=720&nologo=true',
                description: 'A heartwarming and hilarious family comedy from Kerala.',
                genre: ['Comedy', 'Family'],
                language: ['Malayalam'],
                duration: 135,
                releaseDate: new Date('2026-08-20'),
                certificate: 'U',
                director: 'Girish A. D.',
                cast: ['Nivin Pauly', 'Mamitha Baiju', 'Vinay Forrt'],
                rating: 0,
                status: 'Now Showing'
            },
            {
                title: 'Sammarth',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Sammarth%20marathi%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Sammarth%20marathi%20movie?width=1280&height=720&nologo=true',
                description: 'An inspiring Marathi film about strength, resilience, and achieving the impossible.',
                genre: ['Drama'],
                language: ['Marathi'],
                duration: 130,
                releaseDate: new Date('2026-08-14'),
                certificate: 'U',
                director: 'Yogesh Phulphagar',
                cast: ['Bhushan Pradhan', 'Pushkaraj Chirputkar', 'Sharvari Jamenis'],
                rating: 0,
                status: 'Now Showing'
            },
            {
                title: 'Chorr',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Chorr%20bengali%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Chorr%20bengali%20movie?width=1280&height=720&nologo=true',
                description: 'A suspenseful Bengali thriller centered around a high-stakes heist.',
                genre: ['Thriller', 'Crime'],
                language: ['Bengali'],
                duration: 140,
                releaseDate: new Date('2026-07-20'),
                certificate: 'U/A',
                director: 'Agnidev Chatterjee',
                cast: ['Jeetu Kamal', 'Barun Chanda', 'Rajesh Sharma'],
                rating: 0,
                status: 'Now Showing'
            },
            {
                title: 'Chargesheet 03-08',
                poster: 'https://image.pollinations.ai/prompt/movie%20poster%20for%20Chargesheet%2003-08%20kannada%20movie?width=800&height=1200&nologo=true',
                banner: 'https://image.pollinations.ai/prompt/cinematic%20wide%20shot%20for%20Chargesheet%20kannada%20movie?width=1280&height=720&nologo=true',
                description: 'A gripping Kannada investigative thriller about a complex cold case.',
                genre: ['Crime', 'Thriller'],
                language: ['Kannada'],
                duration: 125,
                releaseDate: new Date('2026-08-13'),
                certificate: 'A',
                director: 'Venkat Bharadwaj',
                cast: ['Sundar Raj', 'Venkat Bharadwaj', 'Sathyashree'],
                rating: 0,
                status: 'Now Showing'
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
