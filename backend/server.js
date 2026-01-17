const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Add this import
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'quizventure',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
db.getConnection()
    .then(() => console.log('✅ MySQL database connected'))
    .catch(err => console.error('❌ Database connection error:', err.message));

// Import routes
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const leaderboardRoutes = require('./routes/leaderboard');
const questionRoutes = require('./routes/questions');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/questions', questionRoutes);

// ======= ADD YOUR USER ROUTES HERE (BEFORE app.listen) =======

// GET all users (for admin or testing)
app.get('/api/users', async (req, res) => {
    try {
        // Query your database
        const [users] = await db.query('SELECT id, username, email, score FROM users');
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET specific user by ID
app.get('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const [users] = await db.query(
            'SELECT id, username, email, score FROM users WHERE id = ?',
            [userId]
        );
        if (users.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.json({ success: true, user: users[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// User profile endpoint
app.get('/api/profile', (req, res) => {
    // For now, return mock data
    // Later, get user from JWT token
    res.json({ 
        success: true,
        user: { 
            id: 1, 
            username: 'test', 
            email: 'test@example.com',
            score: 100 
        } 
    });
});

// Update user profile
app.put('/api/profile', (req, res) => {
    // Update user info (mock for now)
    res.json({ 
        success: true, 
        message: 'Profile updated successfully' 
    });
});

// ======= END OF USER ROUTES =======

// Basic route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Quizventure API Running with MySQL', 
        status: 'ok',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            profile: '/api/profile',
            questions: '/api/questions',
            leaderboard: '/api/leaderboard',
            progress: '/api/progress'
        }
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

