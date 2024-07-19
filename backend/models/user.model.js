import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: "",
    },
    aboutText: {
        type: String,
        default: "",

    },
    friends: { 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
        default: [] 
    },
    friendRequests: {  //incoming requests that is not accepted
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
        default: [] 
    },
    pendingFriendRequests: {  // outgoing requested that is not accepted
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: []
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;