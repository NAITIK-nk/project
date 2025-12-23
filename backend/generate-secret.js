const crypto = require('crypto');

// Generate a secure random secret
const secret = crypto.randomBytes(64).toString('hex');

console.log('\n✅ Your JWT_SECRET has been generated!\n');
console.log('Copy this and paste it into your .env file:');
console.log('─'.repeat(80));
console.log(secret);
console.log('─'.repeat(80));
console.log('\n📝 Add this to backend/.env file:');
console.log(`JWT_SECRET=${secret}\n`);




