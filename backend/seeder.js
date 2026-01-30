import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Theme from './models/Theme.js';

dotenv.config();
connectDB();

const themes = [
  {
    name: 'Midnight Tokyo',
    description: 'High contrast, neon-inspired dark mode. Perfect for developers.',
    colors: {
      bg: '#0f172a',
      surface: '#1e293b',
      primary: '#38bdf8',
      secondary: '#f472b6',
      accent: '#facc15',
      text: '#f1f5f9',
      subtext: '#94a3b8'
    },
    createdBy: null
  },
  {
    name: 'Desert Sage',
    description: 'Warm, earthy tones. Calm and professional.',
    colors: {
      bg: '#fdf6e3',
      surface: '#eee8d5',
      primary: '#b58900',
      secondary: '#2aa198',
      accent: '#cb4b16',
      text: '#657b83',
      subtext: '#93a1a1'
    },
    createdBy: null
  },
  {
    name: 'Forest Glass',
    description: 'Deep greens with frosted glass aesthetics.',
    colors: {
      bg: '#052e16',
      surface: 'rgba(255, 255, 255, 0.1)',
      primary: '#4ade80',
      secondary: '#a7f3d0',
      accent: '#fcd34d',
      text: '#ecfdf5',
      subtext: '#6ee7b7'
    },
    createdBy: null
  },
  {
    name: 'Retro Pop',
    description: 'Bold, playful, and high-energy color palette.',
    colors: {
      bg: '#fffaeb',
      surface: '#ffffff',
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      accent: '#1a535c',
      text: '#2d3436',
      subtext: '#636e72'
    },
    createdBy: null
  },
  {
    name: 'Lavender Mist',
    description: 'Soft, dreamy, and aesthetic tones.',
    colors: {
      bg: '#f3e8ff',
      surface: '#ffffff',
      primary: '#d8b4fe',
      secondary: '#f0abfc',
      accent: '#818cf8',
      text: '#4c1d95',
      subtext: '#7e22ce'
    },
    createdBy: null
  },
  {
    name: 'Monochrome Luxe',
    description: 'Minimal grayscale with a bold accent.',
    colors: {
      bg: '#121212',
      surface: '#262626',
      primary: '#ffffff',
      secondary: '#525252',
      accent: '#ff3e00',
      text: '#e5e5e5',
      subtext: '#a3a3a3'
    },
    createdBy: null
  }
];

const importData = async () => {
  try {
    // Check for existing themes and only add new ones
    for (const theme of themes) {
      const exists = await Theme.findOne({ name: theme.name });
      if (!exists) {
        await Theme.create(theme);
        console.log(`✅ Added: ${theme.name}`);
      } else {
        console.log(`⏭️  Skipped (already exists): ${theme.name}`);
      }
    }
    console.log('🔥 Seeding complete!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

importData();
