const bcrypt = require('bcrypt');

async function verifyPassword(plainPassword, hashedPassword) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}

// Usage example:
const enteredPassword = 'mySecurePassword';
verifyPassword(enteredPassword, "$2b$10$6rAaeLvfEVYuEPP74SWyqu4RQamKhSbmZ1dnnNal7s/cYu2UqfSxC").then((isValid) =>
  console.log(isValid ? 'Password is valid' : 'Password is invalid')
);
