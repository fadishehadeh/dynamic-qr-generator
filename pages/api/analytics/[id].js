import dbConnect from '../../../lib/dbConnect';
import QrCode from '../../../models/QrCode';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  const qr = await QrCode.findById(id);
  if (!qr) return res.status(404).json({ error: 'Not found' });

  res.status(200).json({
    totalScans: qr.scans.length,
    scans: qr.scans,
    destination: qr.destination,
    createdAt: qr.createdAt
  });
}