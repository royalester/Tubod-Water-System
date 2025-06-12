// models/Payment.js
import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  householdId: { type: mongoose.Schema.Types.ObjectId, ref: 'Household' },
  month: String,
  amount: Number,
  status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  paidAt: Date,
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
