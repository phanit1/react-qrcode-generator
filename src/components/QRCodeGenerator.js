import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QRCodeGenerator = () => {
  const [generatorType, setGeneratorType] = useState('text');
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const [onlineLink, setOnlineLink] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleOnlineLinkChange = (event) => {
    setOnlineLink(event.target.value);
  };

  const handleGenerateQRCode = () => {
    if (generatorType === 'text') {
      setQRCodeData(inputText);
    } else if (generatorType === 'file') {
      if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          // Handling image file
          // Here you might want to upload the image to a server and generate a link
          setQRCodeData('Image File: ' + file.name);
        } else {
          // Handling other file types (assumed as documents)
          // Here you might want to upload the document to a server and generate a link
          setQRCodeData('Document File: ' + file.name);
        }
      }
    } else if (generatorType === 'onlineLink') {
      setQRCodeData(onlineLink);
    }
    setInputText('');
    setOnlineLink('');
    setFile('');
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <label>Select QR Code Type:</label>
      <select value={generatorType} onChange={(e) => setGeneratorType(e.target.value)}>
        <option value="text">Text</option>
        {/* <option value="file">File</option> */}
        <option value="onlineLink">Online Link</option>
      </select>
      <br /><br />
      {generatorType === 'text' && (
        <div>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text"
          />
        <br /><br />
        </div>
      )}
      {generatorType === 'file' && (
        <div>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        <br /><br />
        </div>
      )}
      {generatorType === 'onlineLink' && (
        <div>
          <input
            type="text"
            value={onlineLink}
            onChange={handleOnlineLinkChange}
            placeholder="Enter online link"
          />
        <br /><br />
        </div>
      )}
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      <br /><br />
      {qrCodeData && <QRCode value={qrCodeData} />}
    </div>
  );
};

export default QRCodeGenerator;
