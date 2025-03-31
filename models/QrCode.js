import mongoose from 'mongoose';

const QrCodeSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  scans: [{ type: Date }]
}, { timestamps: true });

export default mongoose.models.QrCode || mongoose.model('QrCode', QrCodeSchema);