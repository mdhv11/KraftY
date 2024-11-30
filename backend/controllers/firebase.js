const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');
const { errorHandler } = require('../helpers/helpers');

const {
    Firebase_API_KEY,
    Firebase_AUTH_DOMAIN,
    Firebase_PROJECT_ID,
    Firebase_STORAGE_BUCKET,
    Firebase_MESSAGING_SENDER_ID,
    Firebase_APP_ID,
    Firebase_Measurement_Id,
} = process.env;

const firebaseConfig = {
    apiKey: Firebase_API_KEY,
    authDomain: Firebase_AUTH_DOMAIN,
    projectId: Firebase_PROJECT_ID,
    storageBucket: Firebase_STORAGE_BUCKET,
    messagingSenderId: Firebase_MESSAGING_SENDER_ID,
    appId: Firebase_APP_ID,
    measurementId: Firebase_Measurement_Id
};

let app;
let auth;
let firestore;
let storage;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        firestore = getFirestore(app);
        storage = getStorage(app);
    } catch (error) {
        errorHandler(error);
    }
};

const getFirebaseApp = () => app;
const getFirebaseAuth = () => auth;
const getFirebaseFirestore = () => firestore;
const getFirebaseStorage = () => storage;

module.exports = {
    initializeFirebaseApp,
    getFirebaseApp,
    getFirebaseAuth,
    getFirebaseFirestore,
    getFirebaseStorage
};
