import mongoose, { Schema } from "mongoose";
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
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
const Upload = mongoose.model("Upload", uploadSchema);
export default Upload;