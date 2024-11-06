const crypto = require('crypto');

// Secret key for AES encryption (should be kept secure)
const secretKey = '1234567890123456';  // 16 bytes for AES-128
const iv = crypto.randomBytes(16);  // Initialization vector (IV) for AES encryption

// Encrypt function
function encryptData(plainText) {
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(plainText, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
}

// Decrypt function
function decryptData(encryptedData, ivHex) {
    const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(secretKey), Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

// Example Usage
const plainText = 'This is some sensitive data';

console.log('Plain Text:', plainText);

// Encrypting the plain text
const encrypted = encryptData(plainText);
console.log('Encrypted Text:', encrypted);

// Decrypting the data back
const decrypted = decryptData(encrypted.encryptedData, encrypted.iv);
console.log('Decrypted Text:', decrypted);
