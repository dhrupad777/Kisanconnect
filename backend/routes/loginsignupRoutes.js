import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const router = express.Router();

// Temporary in-memory database (Replace with MongoDB/MySQL later)
const users = [];

// ✅ User Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save User
        const newUser = { name, email, password: hashedPassword };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

// ✅ User Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find User
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

// ✅ Protected Route Example
router.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ message: 'Protected content', user: verified });
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
});

export default router;
