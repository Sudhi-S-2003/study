const _sodium = require("libsodium-wrappers");

// Function to hash data
async function hashData(data) {
    await _sodium.ready;

    // Convert data string to Uint8Array
    const dataBytes = _sodium.from_string(data);

    // Create a 32-byte hash of the data
    const hash = _sodium.crypto_generichash(32, dataBytes); // 32-byte hash

    // Convert hash to hex for easier display and return it
    return _sodium.to_hex(hash);
}

// Function to verify data by comparing hashes
async function verifyData(data, storedHash) {
    await _sodium.ready;

    // Hash the incoming data
    const hashedData = await hashData(data);

    // Compare the new hash with the stored hash
    return hashedData === storedHash;
}

// Usage example
(async () => {
    const data = "Some important data to hash";

    // Hash the data
    const hashedData = await hashData(data);
    console.log("Hashed data:", hashedData);

    // Verify the hashed data
    const isValid = await verifyData(data, hashedData);
    console.log("Data verification result:", isValid ? "Valid" : "Invalid");

    // Attempting to verify with different data
    const wrongData = "Some other data to hash";
    const isInvalid = await verifyData(wrongData, hashedData);
    console.log("Wrong data verification result:", isInvalid ? "Valid" : "Invalid");
})();
