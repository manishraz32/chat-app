import User from "../models/user.model.js";


export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const loggedInUserId = req.user._id;
        const user = await User.findById(loggedInUserId).select('friends friendRequests pendingFriendRequests');
        const excludeIds = user.friends.concat(user.friendRequests, user.pendingFriendRequests, [loggedInUserId]);
        const filteredUsers = await User.find({ 
            _id: { $nin: excludeIds } 
        }).select("-password");
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getAllFriends = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate({
            path: 'friends',
            select: '-password' // exclude the password field
        });
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user?.friends);
    } catch(error) {
        console.log("Error in getAllfriends", error);
        res.status(500).josn({error: "Internal server error"});
    }
}

export const getAllFriendRequests = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate({
            path: 'friendRequests',
            select: '-password' // exclude the password field
        });
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user?.friendRequests);
    } catch(error) {
        console.log("Error in getAllFriendRequests", error);
        res.status(500).josn({error: "Internal server error"});
    }
}
