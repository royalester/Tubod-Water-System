// models/Payment.js
import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  householdId: { type: mongoose.Schema.Types.ObjectId, ref: 'Household', required: true },
  month: { type: String, required: true, match: /^\d{4}-\d{2}$/ }, // e.g. '2025-06'
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  paidAt: { type: Date },
  dueDate: { type: Date, required: true }, 
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
