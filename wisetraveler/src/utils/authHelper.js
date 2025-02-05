const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SALT_ROUNDS = 10;

// Hash Password
async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// Compare plain textpassword with hashed password
async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// Generate JWT token
function generateToken(user) {
    const userInfo = {
        id: user.id,
        email: user.email,
    };
    
    return jwt.sign(userInfo, 'replace-with-key-from-env', {expiresIn: '1h' });

}

// Verify JWT token
function verifyToken(token) {
    // Todo
}
