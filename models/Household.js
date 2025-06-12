// models/Household.js
import mongoose from 'mongoose';

const HouseholdSchema = new mongoose.Schema({
  ownerName: String,
  address: String,
  meterNumber: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Household || mongoose.model('Household', HouseholdSchema);
