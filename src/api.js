const qrServerBaseUrl = 'https://api.qrserver.com/v1/create-qr-code/';

export const generateQRCode = (qrData, qrSize,qrColor) => {
  const validHexColor = /^([0-9A-Fa-f]{6})$/;

  if (!validHexColor.test(qrColor)) {
    // Handle invalid color here, such as providing a default color or returning an error.
    qrColor = '000000'; // Default to black if color is invalid.
  }

  const qrImageUrl = `${qrServerBaseUrl}?data=${encodeURIComponent(qrData)}&size=${qrSize}&color=${qrColor}&margin=5`;
  return qrImageUrl;
};
