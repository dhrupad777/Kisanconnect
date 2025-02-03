import { Router } from 'express';
import mysql from 'mysql2/promise'; // Use promise-based API
import cors from 'cors';

const router = Router();

// MySQL Database Connection
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "H1ghw@terr",
    database: "KisanConnect",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Route to fetch storage data for a specific district in Rajasthan
router.get("/storage", async (req, res) => {
    const { district } = req.query; // Get the district from the query parameters

    if (!district) {
        return res.status(400).json({ error: "District is required" });
    }

    try {
        const connection = await pool.getConnection();
        const query = `
            SELECT Location, Name, Designation, PhoneNumber, Email, PercentUtilization
            FROM StorageSilos
            WHERE District = ?
        `;
        const [results] = await connection.query(query, [district]);
        connection.release();

        if (results.length === 0) {
            return res.status(404).json({ error: "No storage data found for the selected district" });
        }

        res.json(results);
    } catch (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;