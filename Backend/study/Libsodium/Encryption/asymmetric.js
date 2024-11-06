const _sodium = require("libsodium-wrappers");

async function asymmetricEncrypt(plainText, senderPrivateKey, receiverPublicKey) {
    await _sodium.ready;

    // Generate a random nonce
    const nonce = _sodium.randombytes_buf(_sodium.crypto_box_NONCEBYTES);

    // Encrypt the plaintext
    const cipherText = _sodium.crypto_box_easy(plainText, nonce, receiverPublicKey, senderPrivateKey);

    return {
        nonce: _sodium.to_base64(nonce),
        cipherText: _sodium.to_base64(cipherText),
    };
}

async function asymmetricDecrypt(encryptedData, receiverPrivateKey, senderPublicKey) {
    await _sodium.ready;

    // Decode nonce and ciphertext from base64
    const nonce = _sodium.from_base64(encryptedData.nonce);
    const cipherText = _sodium.from_base64(encryptedData.cipherText);

    // Decrypt the ciphertext
    const plainTextBytes = _sodium.crypto_box_open_easy(cipherText, nonce, senderPublicKey, receiverPrivateKey);

    return plainTextBytes ? _sodium.to_string(plainTextBytes) : null;
}

// Usage example
(async () => {
    await _sodium.ready;

    // Generate key pairs for both sender and receiver
    const senderKeyPair = _sodium.crypto_box_keypair();
    const receiverKeyPair = _sodium.crypto_box_keypair();

    const message = "Confidential Message";

    // Encrypt using the receiver's public key and sender's private key
    const encrypted = await asymmetricEncrypt(message, senderKeyPair.privateKey, receiverKeyPair.publicKey);
    console.log("Encrypted data:", encrypted);

    // Decrypt using the receiver's private key and sender's public key
    const decrypted = await asymmetricDecrypt(encrypted, receiverKeyPair.privateKey, senderKeyPair.publicKey);
    console.log("Decrypted message:", decrypted);
})();
