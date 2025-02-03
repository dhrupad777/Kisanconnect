import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

import newHarvestRouter from './routes/newHarvestRoutes.js';
import marketplaceRouter from './routes/marketplaceRoutes.js';
import storageRouter from './routes/storageRoutes.js';
import directTradeRouter from './routes/directTradeRoutes.js';
import loginSignupRouter from './routes/loginsignupRoutes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ CORS Configuration
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5501', 'http://127.0.0.1:5501'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ Serve Static Files from Frontend (if exists)
const frontendPath = join(__dirname, '../../frontend');
if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
} else {
    console.warn('⚠️  Frontend directory not found:', frontendPath);
}

// ✅ Configure File Uploads Directory (Directly to assets folder)
const assetsDir = join(__dirname, '../../frontend/assets');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}
app.use('/assets', express.static(assetsDir)); // Serve static files from assets folder

// ✅ Route Mounting
app.use('/newharvest', newHarvestRouter);
app.use('/api', marketplaceRouter);
app.use('/api', storageRouter);
app.use('/api', directTradeRouter);
app.use('/auth', loginSignupRouter);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});