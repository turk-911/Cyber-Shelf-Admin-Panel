import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    uploads: {
        type: Array<String>,
        default: [],
    },
    profilePic: {
        type: String,
        default: "",
    }
});
const User = mongoose.model("AdminUser", userSchema);
export default User;