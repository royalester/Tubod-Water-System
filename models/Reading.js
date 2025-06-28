// models/Reading.js
import mongoose from 'mongoose';

const ReadingSchema = new mongoose.Schema({
  householdId: { type: mongoose.Schema.Types.ObjectId, ref: 'Household', required: true },
  month: { type: String, required: true, match: /^\d{4}-\d{2}$/ }, // e.g. '2025-06'
  previous: { type: Number, required: true, min: 0 },
  current: { type: Number, required: true, min: 0 },
  usage: { type: Number, required: true, min: 0},
  createdAt: { type: Date, default: Date.now },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
});

export default mongoose.models.Reading || mongoose.model('Reading', ReadingSchema);
