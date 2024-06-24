import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const updateFullName = async (req, res) => {
    try {
        const userId = req.params.id;
        const { fullName } = req.body;
        if (!fullName) {
            return res.status(400).json({ error: "fullName is not given" });
        }

        const user = await User.findByIdAndUpdate(userId, { fullName }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log("Error in profile controller", error.message);
        res.status(500).json({ "error": "Internal Server Error" });
    }

}

export const updateAboutText = async (req, res) => {
    try {
        const userId = req.params.id;
        const { aboutText } = req.body;

        if (!aboutText) {
            return res.status(400).json({ error: "abutText is not provided" });
        }
        const user = await User.findByIdAndUpdate(userId, { aboutText }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in profile controller", error.message);
        res.status(500).json({ "error": "Internal Server Error" });
    }
}

export const updateProfileImage = async (req, res) => {
    try {
        const userId = req.params.id;
        let { profilePic } = req.body;
        console.log("profilePic", profilePic);
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ "error": "User doesn't exist" })
        }

        if (profilePic) {
            if (user.profilePic) {
                // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            }
            // console.log("profilePic is available");
            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponse.secure_url;
            // console.log("profilePic: ", profilePic);
        }

        user = await User.findByIdAndUpdate(userId, { profilePic }, { new: true });
        // console.log("user: ", user);
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in update profilePic controller", error.message);
        res.status(500).json({ "error": "Internal Server Error" });
    }
}