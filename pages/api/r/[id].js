
import dbConnect from '../../../lib/dbConnect';
import QrCode from '../../../models/QrCode';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  const qr = await QrCode.findById(id);
  if (!qr) return res.status(404).send('QR not found');

  qr.scans.push(new Date());
  await qr.save();

  res.redirect(qr.destination);
}
