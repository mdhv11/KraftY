const admin = require('firebase-admin');
const { errorHandler } = require('../helpers/helpers'); // Ensure you have an errorHandler function

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        errorHandler(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateToken;
