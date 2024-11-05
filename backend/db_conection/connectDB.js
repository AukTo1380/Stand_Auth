import mongoose from 'mongoose';





export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URL; // Ensure you have this set
        if (!uri) {
            throw new Error('MONGODB_URI is not defined');
        }
        await mongoose.connect(uri);
        console.log('MongoDB Connected...');
        

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); //  throws an error    
    }

};