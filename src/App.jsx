import React, { useRef, useState } from 'react';
import { generateQRCode } from './api';
import './index.css';

function App() {
  const [qrData, setQrData] = useState('https://www.example.com');
  const [qrSize, setQrSize] = useState('200');
  const [qrColor, setQrColor] = useState('#000000');
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

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    
    // Convert selectedColor to hex format (if it's not already hex)
    const hexColor = selectedColor.startsWith('#') ? selectedColor : rgbToHex(selectedColor);
    const decimalColor = hexColor.slice(1);
    setQrColor(decimalColor);
  };

  // Function to convert RGB color to hex
  const rgbToHex = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g); // Extract RGB values
    return `${Number(r).toString(16)}${Number(g).toString(16)}${Number(b).toString(16)}`;
  };

  return (
    <>
      <header>
      <svg className='blcLogo' viewBox="0 0 1526 1526" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M763.523 894.468C908.804 894.468 1026.58 835.818 1026.58 763.468C1026.58 691.119 908.804 632.468 763.523 632.468C618.242 632.468 500.469 691.119 500.469 763.468C500.469 835.818 618.242 894.468 763.523 894.468Z" stroke="#ffffff" stroke-width="49" stroke-miterlimit="31.17"/>
<path d="M763.522 871.235C829.446 871.235 882.888 817.792 882.888 751.868C882.888 685.944 829.446 632.501 763.522 632.501C697.597 632.501 644.155 685.944 644.155 751.868C644.155 817.792 697.597 871.235 763.522 871.235Z" stroke="#ffffff" stroke-width="49" stroke-miterlimit="31.17"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1140.47 762.968C1140.47 971.456 971.456 1140.47 762.969 1140.47C554.481 1140.47 385.469 971.456 385.469 762.968C385.469 554.481 554.481 385.468 762.969 385.468C971.456 385.468 1140.47 554.481 1140.47 762.968ZM763.469 1085.47C941.305 1085.47 1085.47 941.304 1085.47 763.468C1085.47 585.633 941.305 441.468 763.469 441.468C585.633 441.468 441.469 585.633 441.469 763.468C441.469 941.304 585.633 1085.47 763.469 1085.47Z" fill="#ffffff"/>
<path d="M763.469 223.468L763.469 271.468" stroke="#ffffff" stroke-width="104" stroke-linecap="round"/>
<path d="M1254.47 787.468H1302.47" stroke="#ffffff" stroke-width="104" stroke-linecap="round"/>
<path d="M223.469 763.468H271.469" stroke="#ffffff" stroke-width="104" stroke-linecap="round"/>
<path d="M763.469 1254.47L763.469 1302.47" stroke="#ffffff" stroke-width="104" stroke-linecap="round"/>
<path d="M381.838 381.131L415.779 415.072" stroke="#ffffff" stroke-width="104" stroke-linecap="round"/>
<path d="M1127.83 432.749L1161.78 398.808" stroke="#ffffff" stroke-width="104" stroke-linecap="round"/>
<path d="M381.838 1144.81L415.779 1110.86" stroke="#ffffff" stroke-width="104" stroke-linecap="round"/>
<path d="M1110.86 1110.16L1144.81 1144.1" stroke="#ffffff" stroke-width="104" stroke-linecap="round"/>
</svg>

        <p className="logoTitle">Bright Lights Co. presents</p>
      </header>
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
            className="input-field colorInput"
            type='color'
            value={qrColor}
            onChange={handleColorChange}
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
