var admin = require("firebase-admin");

 var serviceAccount = require("./firebase-key.json");

 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
 });

 function getDatabase() {
	return admin.firestore()
}

module.exports = getDatabase
