const crypto = require('crypto');

// Generate a custom ObjectId-like ID
function generateCustomObjectId() {
    // 1. Timestamp: Current Unix timestamp in seconds (4 bytes)
    const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');

    // 2. Machine Identifier: 3 bytes (6 hex characters)
    // Generate a random 3-byte machine identifier (could be based on a unique machine attribute)
    const machineIdentifier = crypto.randomBytes(3).toString('hex');

    // 3. Process Identifier: 2 bytes (4 hex characters)
    // This can be based on the Node.js process ID or another method
    const processIdentifier = process.pid.toString(16).padStart(4, '0'); // Process ID in hex

    // 4. Counter: 3 bytes (6 hex characters)
    // We could use a static counter or generate it randomly.
    // For this example, we will generate a random counter for each call (you can replace this with an actual counter implementation).
    const counter = (Math.floor(Math.random() * 16777215)).toString(16).padStart(6, '0'); // Random 3-byte counter

    // Combine all parts to form the custom ObjectId-like ID
    const customId = timestamp + machineIdentifier + processIdentifier + counter;

    return customId;
}

// Example of generating a custom ObjectId-like ID
const customObjectId = generateCustomObjectId();
console.log('Generated Custom ObjectId-like:', customObjectId);
