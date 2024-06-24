import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { updateAboutText, updateFullName, updateProfileImage } from "../controllers/profile.controller.js";

const router = express.Router();

router.patch('/updateFullName/:id', protectRoute, updateFullName);
router.patch('/updateAbout/:id', protectRoute, updateAboutText);
router.patch('/updateProfilePic/:id', protectRoute, updateProfileImage);


export default router;