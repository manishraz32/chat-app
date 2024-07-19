import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const sendFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (receiver.friendRequests.includes(senderId)) {
            return res.status(400).json({ error: 'Friend request already sent' })
        }

        receiver.friendRequests.push(senderId);
        sender.pendingFriendRequests.push(receiverId);
        await receiver.save();
        await sender.save();

        res.status(200).json({ message: 'Friend request sent' });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


export const acceptFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;
    console.log("senderId", typeof senderId);
    console.log("receiverId", typeof receiverId)
    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        if (!sender || !receiver) {
            return res.status(404).json({ error: 'User not found' });
        }

        // if(receiver.friends.indexOf(senderId) >= 0) {
        //     return res.status(404).json({error: "sender is already friend"});
        // }

        if (!receiver.friendRequests.includes(senderId)) {
            return res.status(400).json({ error: 'No friend request found' });
        }

        receiver.friends.push(senderId);
        sender.friends.push(receiverId);
        receiver.friendRequests = receiver.friendRequests.filter(id => id != senderId);

        await sender.save();
        await receiver.save();
        res.status(200).json({ message: 'friend request accepted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const rejectFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;
    console.log("senderId", typeof senderId);
    console.log("receiverId", typeof receiverId)
    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        if (!sender || !receiver) {
            return res.status(404).json({ error: 'User not found' });
        }

        // if(receiver.friends.indexOf(senderId) >= 0) {
        //     return res.status(404).json({error: "sender is already friend"});
        // }

        if (!receiver.friendRequests.includes(senderId)) {
            return res.status(400).json({ error: 'No friend request found' });
        }
        receiver.friendRequests = receiver.friendRequests.filter(id => id != senderId);
        sender.pendingFriendRequests = sender.pendingFriendRequests.filter(id => id != receiverId)
        
        await sender.save();
        await receiver.save();
        
        res.status(200).json({ message: 'friend request removed'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

