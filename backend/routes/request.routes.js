import express from 'express';
import { acceptFriendRequest, sendFriendRequest } from '../controllers/friendRequest.controller.js';

const router = express.Router();

router.post('/makerequest', sendFriendRequest);
router.post('/acceptrequest', acceptFriendRequest);

export default router;