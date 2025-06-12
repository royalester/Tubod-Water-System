// pages/api/readings/index.js
import connectToDatabase from '@/utils/db';
import Reading from '@/models/Reading';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const readings = await Reading.find();
    res.status(200).json(readings);
  }

  if (req.method === 'POST') {
    const { householdId, month, previous, current, usage } = req.body;
    const newReading = await Reading.create({ householdId, month, previous, current, usage });
    res.status(201).json(newReading);
  }
}
