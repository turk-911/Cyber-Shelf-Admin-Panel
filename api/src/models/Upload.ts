import mongoose, { Schema } from "mongoose";
const uploadSchema = new mongoose.Schema({
    driveLink: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
    },
});
const Upload = mongoose.model("Upload", uploadSchema);
export default Upload;