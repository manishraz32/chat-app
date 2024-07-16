import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllFriendRequests, getAllFriends, getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar);
router.get('/:userId/friends', getAllFriends);
router.get('/:userId/friends-requests', getAllFriendRequests);

export default router;