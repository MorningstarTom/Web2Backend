const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
        origin: process.env.CLIENT || 'https://thriftbay-app.netlify.app',
        credentials: true
}));
app.use(express.json());

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Routes
const authRoutes = require('./routes/authRoute');
const itemRoutes = require('./routes/itemRoute');
const userRoutes = require('./routes/userRoute');

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// MongoDB connection - use environment variable
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
        console.error('MONGO_URI environment variable is not set');
        process.exit(1);
}

mongoose.connect(mongoUri)
        .then(() => console.log('Connection to MongoDB successful!'))
        .catch((err) => {
                console.error("Connect to db failed: " + err);
                process.exit(1);
});

// Global error handler
app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something broke!' });
});

// Health check endpoint
app.get('/', (req, res) => {
        res.json({ message: 'Backend is running!', status: 'healthy' });
});

// Start server
const port = process.env.PORT || 3001;

app.listen(port, '0.0.0.0', () => {
        console.log(`Server is running on 0.0.0.0:${port}`);
});