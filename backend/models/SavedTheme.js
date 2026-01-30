import mongoose from 'mongoose';

const SavedThemeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    theme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theme',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('SavedTheme', SavedThemeSchema);
