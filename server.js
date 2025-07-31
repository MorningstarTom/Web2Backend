const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const database = "mongodb://localhost:27017/shopeelite"

dotenv.config();
const app = express();

// Middleware
app.use(cors());
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

// MongoDB connection
mongoose.connect(database)
        .then(() => console.log('Connection to MongoDB successful! '))
        .catch((err) => console.error("Connect to db failed" + err))

// Start server
const port = 3000;
app.listen(port, () => {
        console.log("Server is running at http://localhost:" + port)
})

app.get('/', (req, res) => {
        res.send('Backend is running!');
});