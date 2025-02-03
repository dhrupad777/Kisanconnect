import { Router } from 'express';
import mysql from 'mysql2/promise';

const router = Router();

// Database Connection
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'H1ghw@terr',
    database: 'kisanconnect',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// ✅ Fetch all trades
router.get('/trades', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute('SELECT * FROM direct_trade');
        connection.release();
        console.log("Fetched trades from DB:", results);
        res.json(results);
    } catch (err) {
        console.error('Error fetching trades:', err);
        res.status(500).json({ error: 'Failed to fetch trades' });
    }
});

// ✅ Add a new trade
router.post('/trades', async (req, res) => {
    const { trade_type, name, needs, deadline, price, email, phone } = req.body;

    if (!trade_type || !name || !needs || !deadline || !price || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const connection = await pool.getConnection();
        const query = `
            INSERT INTO direct_trade (trade_type, name, needs, deadline, price, email, phone)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await connection.execute(query, [
            trade_type,
            name,
            needs,
            deadline,
            price,
            email,
            phone,
        ]);
        connection.release();
        res.status(201).json({ message: 'Trade added successfully', tradeId: result.insertId });
    } catch (err) {
        console.error('Error adding trade:', err);
        res.status(500).json({ error: 'Failed to add trade' });
    }
});

export default router;
