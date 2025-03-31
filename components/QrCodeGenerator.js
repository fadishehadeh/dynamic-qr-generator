import { useState } from 'react';
import QRCode from 'react-qr-code';

export default function QrCodeGenerator() {
  const [url, setUrl] = useState('');
  const [qrId, setQrId] = useState(null);

  const createQR = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/qrs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    setQrId(data.id);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form onSubmit={createQR}>
        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" required />
        <button type="submit">Generate</button>
      </form>

      {qrId && (
        <>
          <QRCode value={`${window.location.origin}/api/r/${qrId}`} />
          <p>{`${window.location.origin}/api/r/${qrId}`}</p>
        </>
      )}
    </div>
  );
}