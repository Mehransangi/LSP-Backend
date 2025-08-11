import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createNameTagController, deleteUnametag, getAllUnametag, updateNameTagController } from '../controllers/uniNameTagController.js';

const router = express.Router()

// Create University Nametag
router.post('/create-uninametag', requireSignIn, isAdmin, createNameTagController)

// Update University Nametag
router.put('/update-uninametag/:id', requireSignIn, isAdmin, updateNameTagController)

// Get All 
router.get('/uninametags', getAllUnametag)

// Delete
router.delete('/delete-uninametag/:id', requireSignIn, isAdmin, deleteUnametag)



export default router;