const express = require('express')
const router = express.Router()

//importera databas från database.js
 const getDatabase = require('../database.js')
//anropa funktionen
 const db = getDatabase();




//GET VG DEL
 router.get('/', async (req, res) => {
    
 		const hamstrarRef = db.collection('matches');
 		const snapshot = await hamstrarRef.get();
	
 		if (snapshot.empty) {
 			res.send([])
 			return
 		}
 		items = []
	
 		snapshot.forEach(doc => {
 			const data = doc.data()
			data.id = doc.id 
 			items.push(data)
 		})
 		res.status(200).send(items)	

 })

 router.get('/:id', async (req, res) => {
     const id = req.params.id
 	 const docRef =  await db.collection('matches').doc(id).get()
     

	 if(!docRef.exists) {
		 res.status(404).send('Database not found')
		 return
	 }

	 const data = docRef.data()
	 res.status(200).send(data)
	
 })



 //POST
router.post('/', async (req, res) => {
	
	const object = req.body 

	if (!isMatchesObject(object)) {
        res.status(400).send("Object is not defined")
        return
    }

	const docRef = await db.collection('matches').add(object)

    res.status(200).send({id:docRef.id})
	
})

function isMatchesObject(maybeObject) {

	if (!maybeObject)
		return false
	else if (!maybeObject.winnerId ||!maybeObject.loserId)
		return false

	return true
}

 //DELETE
 
router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const docRef = db.collection('matches').doc(id)
    const doc = await docRef.get();
  
	try{
	  	  if (!doc.exists) {
		  res.status(404).send("Database does not exist")
		  return
	  }
  
	  if (!id) {
		res.status(400).send('ID not found')
		  return
	  }
	  
	  await docRef.delete()    
	  res.sendStatus(200)
	} 
	catch (err) {
		res.sendStatus(500).send(err.message)
	}
})
 module.exports = router