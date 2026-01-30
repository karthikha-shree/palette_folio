import Theme from '../models/Theme.js';
import SavedTheme from '../models/SavedTheme.js';

// ✅ PUBLIC: Get all themes
export const getAllThemes = async (req, res) => {
  try {
    const themes = await Theme.find({ createdBy: null });
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 SAVE THEME (Logged-in users)
export const saveTheme = async (req, res) => {
  const { themeId } = req.body;

  try {
    const alreadySaved = await SavedTheme.findOne({
      user: req.user._id,
      theme: themeId
    });

    if (alreadySaved) {
      return res.status(400).json({ message: 'Theme already saved' });
    }

    const savedTheme = await SavedTheme.create({
      user: req.user._id,
      theme: themeId
    });

    res.status(201).json(savedTheme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 GET USER SAVED THEMES
export const getSavedThemes = async (req, res) => {
  try {
    const savedThemes = await SavedTheme.find({
      user: req.user._id
    }).populate('theme');

    res.json(savedThemes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 DELETE SAVED THEME
export const deleteSavedTheme = async (req, res) => {
  try {
    const savedTheme = await SavedTheme.findOneAndDelete({
      user: req.user._id,
      theme: req.params.id
    });

    if (!savedTheme) {
      return res.status(404).json({ message: 'Saved theme not found' });
    }

    res.json({ message: 'Theme removed from saved list' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 CREATE CUSTOM THEME
export const createCustomTheme = async (req, res) => {
  const { name, description, colors } = req.body;

  try {
    // Validate required fields
    if (!name || !colors) {
      return res.status(400).json({ message: 'Name and colors are required' });
    }

    // Create the theme with user as creator
    const theme = await Theme.create({
      name,
      description: description || `Custom theme by ${req.user.name}`,
      colors,
      createdBy: req.user._id
    });

    // Auto-save to user's saved themes
    await SavedTheme.create({
      user: req.user._id,
      theme: theme._id
    });

    res.status(201).json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 GET USER'S CUSTOM THEMES
export const getMyThemes = async (req, res) => {
  try {
    const themes = await Theme.find({ createdBy: req.user._id });
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 DELETE CUSTOM THEME
export const deleteCustomTheme = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);

    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }

    if (theme.createdBy?.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this theme' });
    }

    // Remove from saved themes too
    await SavedTheme.deleteMany({ theme: req.params.id });
    await Theme.findByIdAndDelete(req.params.id);

    res.json({ message: 'Theme deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
