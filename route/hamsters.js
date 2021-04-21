const express = require('express')
const router = express.Router()

//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
const db = getDatabase();



//GET
router.get('/', async (req, res) => {
    // console.log('/hamstrar REST API');
    // res.send('/hamstrar REST API');

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
        // res.send(data)
        items.push(data)
    })
    res.status(200).send(items)
});

//POST
router.post('/', async (req, res) => {
	const hamster = req.body
	const docRef = await db.collection('Hamsterwar').add(hamster)
    console.log('The document id is: ' + docRef.id)
	res.send(docRef.id)
})



module.exports = router