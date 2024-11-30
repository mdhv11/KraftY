require('dotenv').config();
const express = require('express');
const { initializeFirebaseApp, getFirebaseAuth } = require('./controllers/firebase');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

initializeFirebaseApp();

// Firebase Authentication middleware to check token
const firebaseAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    const idToken = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await getFirebaseAuth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
};

// Apply middleware to secure routes
app.use('/api/user', firebaseAuthMiddleware, userRoutes);
app.use('/api/listings', firebaseAuthMiddleware, listingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
