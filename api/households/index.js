// pages/api/households/index.js
import connectToDatabase from '@/utils/db';
import Household from '@/models/Household';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const households = await Household.find();
    res.status(200).json(households);
  }

  if (req.method === 'POST') {
    const { ownerName, address, meterNumber } = req.body;
    const newHousehold = await Household.create({ ownerName, address, meterNumber });
    res.status(201).json(newHousehold);
  }
}
