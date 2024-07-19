import express from 'express';
import { acceptFriendRequest, rejectFriendRequest, sendFriendRequest } from '../controllers/friendRequest.controller.js';

const router = express.Router();

router.post('/makerequest', sendFriendRequest);
router.post('/acceptrequest', acceptFriendRequest);
router.post('/rejectrequest', rejectFriendRequest);

export default router;