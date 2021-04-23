const express = require('express')
const router = express.Router()

//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
const db = getDatabase();



//GET
router.get('/', async (req, res) => {
  
    const hamstrarRef = db.collection('Hamsterwar');
    const snapshot = await hamstrarRef.get();

    if (snapshot.empty) {
        res.send([])
        return
    }
    items = []

    snapshot.forEach(doc => {
        const data = doc.data()
        data.id = doc.id //ID behövs för POST, PUT, DELETE
        items.push(data)
    })
    res.status(200).send(items)
});




//POST
router.post('/', async (req, res) => {
	const object = req.body
	console.log('console', object)
	if(!object){
		res.status(400).send('Object is not defined')
		return
	}
	const docRef = await db.collection('Hamsterwar').add(object)
	console.log('Hej')
	
	if(!docRef.exists) {
		res.status(400).send('Bad request')
		return
	}
    console.log('The document id is: ' + docRef.id)
	res.status(200).send(docRef.id)
})


//PUT
router.put('/:id', async (req, res) => {
	const object = req.body
	const id = req.params.id
	
	
	if(!object || !id) {
		res.status(404).send('Hamster not found')
		return
	}

	const docRef = db.collection('Hamsterwar').doc(id)
	await docRef.set(object, { merge: true })

})

//RANDOM
router.get('/random', async (req, res) => {

	const hamstrarRef = db.collection('Hamsterwar');
	const snapshot = await hamstrarRef.get();

   if (snapshot.empty) {
        res.send([])
        return
    }
    items = []

    snapshot.forEach(doc => {
        const data = doc.data()
        data.id = doc.id //ID behövs för POST, PUT, DELETE
        items.push(data)
    })

	const randomIndex = Math.floor(Math.random() * items.length);

    res.status(200).send(items[randomIndex])
})

//GET ID
router.get('/:id', async (req, res) => {
     const id = req.params.id
	 const docRef =  await db.collection('Hamsterwar').doc(id).get()
     
	 if(!docRef.exists) {
		 res.status(404).send('Hamster not found')
		 return
	 }

	 const data = docRef.data()
	 res.send(data)
})


//DELETE
router.delete('/:id', async (req,res) => {

	const id = req.params.id

	if(!id) {
		// res.sendStatus(400)
	
		res.status(404).send('ID not found')
		return
	}

	await db.collection('Hamsterwar').doc(id).delete
	// const result =  docRef.delete()
	res.status(200).send('It worked')
})



module.exports = router