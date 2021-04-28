const express = require('express')
const router = express.Router()

//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
const db = getDatabase();


router.get('/:id', async (req, res) => {

	const id = req.params.id
	const docRef = await db.collection('matches').doc(id)
	const snapshot = await docRef.get();

	if (snapshot.empty) {
	   res.sendStatus(404)
	   return
   }

   const winner = []

   snapshot.forEach(doc => {
	   const data = doc.data()
	  data.id = doc.id //ID behövs för POST, PUT, DELETE
	   items.push(data)
   })
   res.status(200).send(winner)	

})

module.exports = router