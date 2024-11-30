const express = require('express');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const { firestore } = require('../controllers/firebase');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    const { title, description, price } = req.body;
    const userId = req.user.uid;

    try {
        const newListing = {
            title,
            description,
            price,
            userId
        };

        const docRef = await addDoc(collection(firestore, 'listings'), newListing);
        res.status(201).json({ id: docRef.id, ...newListing });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'listings'));
        const listings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
