const express = require('express');
const router = express.Router();
const { getFirebaseAuth, getFirebaseFirestore } = require('../controllers/firebase');

// POST /api/user/signup
router.post('/signup', async (req, res) => {
    const { email, password, displayName } = req.body;
    try {
        // Create user in Firebase Authentication
        const userCredential = await getFirebaseAuth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Save user data to Firestore
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: displayName // or any other user data you want to save
        };
        const userRef = await getFirebaseFirestore().collection('users').doc(user.uid).set(userData);

        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST /api/user/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await getFirebaseAuth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
