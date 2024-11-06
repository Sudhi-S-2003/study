const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10; // Determines hashing complexity
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Usage example:
const plainTextPassword = 'mySecurePassword';
hashPassword(plainTextPassword).then((hash) => console.log(hash));
