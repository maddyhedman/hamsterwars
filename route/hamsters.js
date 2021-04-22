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

//POST
router.post('/', async (req, res) => {
	const hamster = req.body
	const docRef = await db.collection('Hamsterwar').add(hamster)
	
	if(!docRef.exists) {
		res.status(404).send('Oops')
		return
	}
    console.log('The document id is: ' + docRef.id)
	res.send(docRef.id)
})



module.exports = router