
import dbConnect from '../../lib/dbConnect';
import QrCode from '../../models/QrCode';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  await dbConnect();
  const qr = await QrCode.create({ destination: url });
  res.status(201).json({ id: qr._id.toString() });
}
