const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // You can also use a service account file:
  // credential: admin.credential.cert(require('./serviceAccountKey.json')),
});

module.exports = admin; 