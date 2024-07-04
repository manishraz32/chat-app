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
        await receiver.save();

        res.status(200).json({ error: 'Friend request sent' })

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const acceptFriendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!receiver.friendRequests.includes(senderId)) {
            return res.status(400).json({ error: 'No friend request found' });
        }

        receiver.friends.push(senderId);
        sender.friends.push(receiverId);

        await sender.save();
        await receiver.save();

        receiver.friendRequests = receiver.friendRequests.filter(id => id.toString != senderId);


        await sender.save();
        await receiver.save();

        
        res.status(200).json({ message: 'friend request accepted' });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}