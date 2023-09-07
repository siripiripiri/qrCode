import React, { useRef, useState } from 'react';
import './App.css';
import { generateQRCode } from './api';

function App() {
  const [qrData, setQrData] = useState('https://www.example.com');
  const [qrSize, setQrSize] = useState('200');
  const [qrColor, setQrColor] = useState('000000');
  const QRsize = `${qrSize}x${qrSize}`;
  const qrCodeRef = useRef(null);

  // Function to generate and download the QR code image as a PNG
  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = generateQRCode(qrData, QRsize, qrColor);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'qrcode.png';
          a.click();
          URL.revokeObjectURL(url);
        });
      };
    }
  };

  return (
    <>
      <div className="headerStyle">
        <p className="logoTitle">Bright Lights Co. presents</p>
      </div>
      <div className="app-container">
        <h1 className='app-title'>QR Code Generator</h1>
        <div className="input-container">
          <label className="input-label">URL :</label>
          <input 
            className="input-field"
            type='text'
            value={qrData}
            onChange={(e)=> setQrData(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label className="input-label">Size :</label>
          <input
            className="input-field"
            type='text'
            value={qrSize}
            onChange={(e)=> setQrSize(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label className="input-label">Color :</label>
          <input
            className="input-field"
            type='text'
            value={qrColor}
            onChange={(e)=> setQrColor(e.target.value)}
          />
        </div>
        <div className='qr-code' ref={qrCodeRef}>
          <img className='qr-img' src={generateQRCode(qrData, QRsize, qrColor)} alt="QR Code" />
        </div>
        
        {/* Download button */}
        <button className="download-button" onClick={downloadQRCode}>
          Download 
        </button>
      </div>
    </>
  )
}

export default App;
