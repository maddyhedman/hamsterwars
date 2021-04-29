const express = require('express')
const router = express.Router()

//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
const db = getDatabase();



router.get('/:id', async (req, res) => {
	const id = req.params.id
    const docRef = db.collection('matches')
	const snapshot = await docRef.where('winnerId', '==', `${id}`).get()
	
	try {
	   if (snapshot.empty) {
        console.log('test')
		res.status(404).send('Hamsters does not exist')
        return
       }

	let items = []
	snapshot.forEach(doc => {
		const data = doc.data()
		items.push(data)  
	})
	res.status(200).send(items)	
    } catch (err) {
	 
		res.sendStatus(500).send(err.message)
		
}

})



module.exports = router