import mongoose from "mongoose";
const url = process.env.MONGO_DB_URI || "";
const connectDB = async () => {
    try {
        await mongoose.connect(url)
        .then(() => console.log('Database connected'))
        .catch(() => console.log('Failed to connect to database'));
    } catch (error) {
        console.error('Error connecting to database', error);
        process.exit(1);
    }
}