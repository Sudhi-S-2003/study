const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const sodium = require('libsodium-wrappers');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Secret for your private/public keys
const ENCRYPTION_PRIVATE_KEY = 'your-private-key-here';
const ENCRYPTION_PUBLIC_KEY = 'your-public-key-here';

// Key pair generation API
app.post('/generate-keys', (req, res) => {
  const { userId } = req.body; // Receive userId from request body
  if (!userId) {
    return res.status(400).json({ message: 'UserId is required!' });
  }

  // Generate RSA Key Pair (public/private keys)
  const { publicKey, privateKey } = generateKeyPair();

  // Store public key in database (simulate with a simple object for now)
  // In a real application, save to your database (e.g., MongoDB or SQL)
  const userPublicKey = { userId, publicKey };

  // Respond back with the private key (secured)
  res.json({ privateKey: privateKey.toString('base64') });

  // Here you would store the `userPublicKey` in the database
  console.log('Storing User Public Key:', userPublicKey);
});

// Example: Encrypt data from the user with their public key
app.post('/encrypt-data', (req, res) => {
  const { publicKey, data } = req.body;
  if (!publicKey || !data) {
    return res.status(400).json({ message: 'PublicKey and Data are required!' });
  }

  try {
    const encryptedData = encryptWithPublicKey(publicKey, data);
    res.status(200).json({ encryptedData });
  } catch (error) {
    res.status(500).json({ message: 'Encryption failed!', error: error.message });
  }
});

// Example: Decrypt data using private key
app.post('/decrypt-data', (req, res) => {
  const { privateKey, encryptedData } = req.body;
  if (!privateKey || !encryptedData) {
    return res.status(400).json({ message: 'PrivateKey and EncryptedData are required!' });
  }

  try {
    const decryptedData = decryptWithPrivateKey(privateKey, encryptedData);
    res.status(200).json({ decryptedData });
  } catch (error) {
    res.status(500).json({ message: 'Decryption failed!', error: error.message });
  }
});

// Generate a new RSA key pair
function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Length of the key
  });

  return { publicKey, privateKey };
}

// Encrypt data using public key
function encryptWithPublicKey(publicKey, data) {
  const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data));
  return encryptedData.toString('base64');
}

// Decrypt data using private key
function decryptWithPrivateKey(privateKey, encryptedData) {
  const decryptedData = crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64'));
  return decryptedData.toString('utf8');
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
