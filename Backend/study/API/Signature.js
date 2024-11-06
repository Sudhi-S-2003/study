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

// Example: Sign data from the user with their private key
app.post('/sign-data', (req, res) => {
  const { privateKey, data } = req.body;
  if (!privateKey || !data) {
    return res.status(400).json({ message: 'PrivateKey and Data are required!' });
  }

  try {
    const signedData = signWithPrivateKey(privateKey, data);
    res.status(200).json({ signedData });
  } catch (error) {
    res.status(500).json({ message: 'Signing failed!', error: error.message });
  }
});

// Example: Verify signed data using public key
app.post('/verify-signature', (req, res) => {
  const { publicKey, data, signature } = req.body;
  if (!publicKey || !data || !signature) {
    return res.status(400).json({ message: 'PublicKey, Data, and Signature are required!' });
  }

  try {
    const isValid = verifySignatureWithPublicKey(publicKey, data, signature);
    res.status(200).json({ isValid });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed!', error: error.message });
  }
});

// Generate a new RSA key pair
function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Length of the key
  });

  return { publicKey, privateKey };
}

// Sign data using private key
function signWithPrivateKey(privateKey, data) {
  const sign = crypto.createSign('SHA256');
  sign.update(data); // Data to sign
  sign.end();
  const signature = sign.sign(privateKey, 'base64'); // Sign the data with private key
  return signature;
}

// Verify data using public key
function verifySignatureWithPublicKey(publicKey, data, signature) {
  const verify = crypto.createVerify('SHA256');
  verify.update(data); // Data to verify
  verify.end();
  return verify.verify(publicKey, signature, 'base64'); // Verify signature using public key
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
