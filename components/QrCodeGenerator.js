import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function QrCodeGenerator() {
  const [url, setUrl] = useState('');
  const [qrId, setQrId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createQR = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQrId(null);

    try {
      const res = await fetch('/api/qrs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate QR');

      setQrId(data.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Dynamic QR Code Generator</h1>

      <form onSubmit={createQR} className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
          className="border rounded-lg p-3 shadow-md w-[350px]"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-5 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {qrId && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-xl">
          <QRCode value={`${window.location.origin}/api/r/${qrId}`} size={256} />
          <p className="mt-4 font-medium">
            Scan or visit:{' '}
            <a
              className="text-blue-600 underline break-all"
              href={`${window.location.origin}/api/r/${qrId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${window.location.origin}/api/r/${qrId}`}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
