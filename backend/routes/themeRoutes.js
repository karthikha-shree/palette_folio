import express from 'express';
import {
  getAllThemes,
  saveTheme,
  getSavedThemes,
  deleteSavedTheme,
  createCustomTheme,
  getMyThemes,
  deleteCustomTheme
} from '../controllers/themeController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// 🌍 Public
router.get('/', getAllThemes);

// 🔐 Protected
router.post('/save', protect, saveTheme);
router.get('/saved', protect, getSavedThemes);
router.delete('/saved/:id', protect, deleteSavedTheme);

// 🔐 Custom Themes
router.post('/custom', protect, createCustomTheme);
router.get('/my-themes', protect, getMyThemes);
router.delete('/custom/:id', protect, deleteCustomTheme);

export default router;
