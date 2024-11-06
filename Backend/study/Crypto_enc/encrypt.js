const crypto = require('crypto');

// Key and IV (Initialization Vector) generation
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // 32 bytes for AES-256
const iv = crypto.randomBytes(16);  // 16 bytes for AES block size

// Encrypt function
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
}

// Decrypt function
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(encryptedText.iv, 'hex'));
  let decrypted = decipher.update(encryptedText.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Example usage:
const message = 'Hello, this is a secret message!';
const encryptedMessage = encrypt(message);
console.log('Encrypted:', encryptedMessage);

const decryptedMessage = decrypt(encryptedMessage);
console.log('Decrypted:', decryptedMessage);
