const crypto = require('crypto');

// Asymmetric encryption using RSA
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 520, // Length of the key
});

// Convert keys to PEM format for display
const publicKeyPEM = publicKey.export({ type: 'pkcs1', format: 'pem' });
const privateKeyPEM = privateKey.export({ type: 'pkcs1', format: 'pem' });

console.log("Public key PEM format:\n", publicKeyPEM);
console.log("Private key PEM format:\n", privateKeyPEM);

// Encrypt with public key
function encryptWithPublicKey(text) {
    const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(text));
    return encryptedData.toString('hex');
}

// Decrypt with private key
function decryptWithPrivateKey(encryptedData) {
    const decryptedData = crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'hex'));
    return decryptedData.toString('utf8');
}

// Example Usage
const text = 'Sensitive Data';
const encrypted = encryptWithPublicKey(text);
console.log('Encrypted with public key:', encrypted);

const decrypted = decryptWithPrivateKey(encrypted);
console.log('Decrypted with private key:', decrypted);
