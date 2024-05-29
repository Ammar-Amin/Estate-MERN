import { Router } from "express";
import { createListing, deleteListing, updateListing, getListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Router();

router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.post('/update/:id', verifyToken, updateListing)
router.get('/get/:id', verifyToken, getListing)

export default router;