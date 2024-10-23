import mongoose from "mongoose";
const uploadSchema = new mongoose.Schema({
    driveLink: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    }
});
const Upload = mongoose.model("Upload", uploadSchema);