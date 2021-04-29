const express = require('express')
const router = express.Router()

//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
const db = getDatabase();

router.get('/', async (req, res) => {
	
    const docRef = db.collection('Hamsterwar')
	const snapshot = await docRef.orderBy('defeats', 'desc').limit(5).get()
	
	try {
	  if (snapshot.empty) {
		res.status(404).send('Hamsters does not exist')
        return
      }
	   let items = []
	   snapshot.forEach(doc => {
	   const data = doc.data()
	   items.push(data)  
	})
	
	res.status(200).send(items)	
} catch (err)  {

		res.sendStatus(500).send(err.message)
		
}

})



module.exports = router