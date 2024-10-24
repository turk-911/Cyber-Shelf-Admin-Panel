import mongoose from "mongoose";
const url = process.env.MONGO_DB_URI || "";
export const connectDB = async () => {
    try {
        console.log(url);
        await mongoose.connect(url)
        .then(() => console.log('Database connected'))
        .catch(() => console.log('Failed to connect to database'));
    } catch (error) {
        console.error('Error connecting to database', error);
        process.exit(1);
    }
}