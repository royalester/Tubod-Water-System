// models/Reading.js
import mongoose from 'mongoose';

const ReadingSchema = new mongoose.Schema({
  householdId: { type: mongoose.Schema.Types.ObjectId, ref: 'Household' },
  month: String, // e.g. '2025-06'
  previous: Number,
  current: Number,
  usage: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Reading || mongoose.model('Reading', ReadingSchema);
