import Head from 'next/head';
import QrCodeGenerator from '../components/QrCodeGenerator';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dynamic QR Generator</title>
        <meta name="description" content="Generate QR Codes and track scans." />
      </Head>
      <main>
        <h1 style={{ textAlign: 'center' }}>Dynamic QR Code Generator</h1>
        <QrCodeGenerator />
      </main>
    </div>
  );
}