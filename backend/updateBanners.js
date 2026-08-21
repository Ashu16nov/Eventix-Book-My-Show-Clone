import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Movie from './models/Movie.js';

dotenv.config();

const updateBanners = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventix');
        
        console.log('Connected to DB. Updating banners...');

        const updates = [
            { title: 'Deadpool & Wolverine', banner: 'https://image.tmdb.org/t/p/original/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg' },
            { title: 'The Batman - Part II', banner: 'https://image.tmdb.org/t/p/original/b0PlSNiRoTwvd1c1w6r5cO895gW.jpg' },
            { title: 'The Dark Knight', banner: 'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg' },
            { title: 'Inception', banner: 'https://image.tmdb.org/t/p/original/s3TBrRGB1invgVWKiASTv0l20P9.jpg' }
        ];

        for (const update of updates) {
            await Movie.updateOne({ title: update.title }, { $set: { banner: update.banner } });
            console.log(`Updated banner for ${update.title}`);
        }

        console.log('Update complete!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

updateBanners();
