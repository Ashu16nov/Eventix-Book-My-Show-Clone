import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

let globalMongoServer;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to primary MongoDB: ${error.message}`);
        console.log('Falling back to In-Memory MongoDB Server for local development...');
        
        try {
            globalMongoServer = await MongoMemoryServer.create();
            const mongoUri = globalMongoServer.getUri();
            
            await mongoose.connect(mongoUri);
            console.log(`In-Memory MongoDB Connected: ${mongoose.connection.host}`);
            
            // Auto-seed if empty
            console.log('Running seeder for in-memory DB...');
            const importData = (await import('../utils/seeder.js')).default;
            await importData();
            
        } catch (fallbackError) {
            console.error(`Fallback failed: ${fallbackError.message}`);
            process.exit(1);
        }
    }
};

export default connectDB;
