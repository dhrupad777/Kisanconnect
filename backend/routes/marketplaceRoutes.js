import { Router } from 'express';
import mysql from 'mysql2/promise';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'H1ghw@terr',
  database: 'kisanconnect',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Multer configuration
const uploadDir = join(__dirname, '../../frontend/assets/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Routes
router.get('/listings', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM marketplace');
    res.json(results);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/listings', upload.single('image'), async (req, res) => {
  const { 
    type, 
    title, 
    contact, 
    price, 
    state, 
    district, 
    description, 
    equipment_type, 
    duration, 
    size 
  } = req.body;

  // Validate required fields
  if (!type || !title || !contact || !price || !state || !district || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Handle image upload
  if (!req.file) {
    return res.status(400).json({ error: "Image is required" });
  }
  const image_url = `/assets/uploads/${req.file.filename}`;

  // Auto-generated fields
  const posted_on = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  // Insert into database
  const sql = `
    INSERT INTO marketplace (
      type, title, contact, price, duration, size, state, district,
      posted_on, description, image_url, equipment_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    type, 
    title, 
    contact, 
    parseFloat(price), 
    duration || null, 
    size || null, 
    state, 
    district, 
    posted_on, 
    description, 
    image_url, 
    equipment_type || null
  ];

  try {
    const [result] = await db.query(sql, values);
    res.json({ 
      message: 'Listing added successfully',
      id: result.insertId 
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.put('/listings/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { 
    type, 
    title, 
    contact, 
    price, 
    duration, 
    size, 
    state, 
    district, 
    description, 
    equipment_type 
  } = req.body;
  const image_url = req.file ? `/assets/uploads/${req.file.filename}` : req.body.image_url;

  const sql = `
    UPDATE marketplace SET 
    type = ?, title = ?, contact = ?, price = ?, duration = ?, size = ?, state = ?, district = ?, 
    description = ?, image_url = ?, equipment_type = ?
    WHERE id = ?
  `;
  const values = [
    type, title, contact, price, duration, size, state, district, 
    description, image_url, equipment_type, id
  ];

  try {
    await db.query(sql, values);
    res.json({ message: 'Listing updated successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.delete('/listings/:id', async (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM marketplace WHERE id = ?';
  try {
    await db.query(sql, [id]);
    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;