import mongoose from 'mongoose';

const ThemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    colors: {
      bg: String,
      surface: String,
      primary: String,
      secondary: String,
      accent: String,
      text: String,
      subtext: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null // null = system theme
    }
  },
  { timestamps: true }
);

export default mongoose.model('Theme', ThemeSchema);
