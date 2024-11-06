const _sodium = require("libsodium-wrappers");

async function symmetricEncrypt(plainText, key) {
    await _sodium.ready;
    
    // Generate a random nonce
    const nonce = _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES);
    
    // Encrypt the plaintext
    const cipherText = _sodium.crypto_secretbox_easy(plainText, nonce, key);
    
    // Return both the nonce and the ciphertext as they are both needed to decrypt
    return {
        nonce: _sodium.to_base64(nonce),
        cipherText: _sodium.to_base64(cipherText),
    };
}

async function symmetricDecrypt(encryptedData, key) {
    await _sodium.ready;
    
    // Decode nonce and ciphertext from base64
    const nonce = _sodium.from_base64(encryptedData.nonce);
    const cipherText = _sodium.from_base64(encryptedData.cipherText);
    
    // Decrypt the ciphertext
    const plainTextBytes = _sodium.crypto_secretbox_open_easy(cipherText, nonce, key);
    
    return plainTextBytes ? _sodium.to_string(plainTextBytes) : null;
}

// Usage example
(async () => {
    await _sodium.ready;
    
    // Generate a 32-byte symmetric key
    const key = _sodium.randombytes_buf(_sodium.crypto_secretbox_KEYBYTES);
    
    const message = "Sensitive Information";
    const encrypted = await symmetricEncrypt(message, key);
    console.log("Encrypted data:", encrypted);
    
    const decrypted = await symmetricDecrypt(encrypted, key);
    console.log("Decrypted message:", decrypted);
})();
