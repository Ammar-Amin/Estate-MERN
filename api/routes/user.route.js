import express from 'express';
import { allUsers, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)
router.get('/all', allUsers)
router.post('/update/:id', verifyToken, updateUser)

export default router;