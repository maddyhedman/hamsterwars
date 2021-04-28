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
        res.status(404).send('Hamsters does not exist')
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
	
	const object = req.body //Enligt consolen så returneras object tomt

	console.log('console', object)

	if (!isHamsterObject(object)) {
        res.status(400).send("Object is not defined")
        return
    }

	const docRef = await db.collection('Hamsterwar').add(object)
    console.log('The document id is: ' + docRef.id)


    console.log("console log 2")
    res.status(200).send({id:docRef.id})

	
	console.log('Hej')
	
})

// Funktionen kollar om hamster är ett objekt
function isHamsterObject(maybeObject) {

	if (!maybeObject)
		return false
	else if (!maybeObject.name || !maybeObject.age)
		return false

	return true
};


//PUT
 router.put('/:id', async (req, res) => {
	

	const object = req.body
     const id = req.params.id
     const docRef = await db.collection('Hamsterwar').doc(id).get()
    
	 if (!id || !docRef.exists) {
        res.status(404).send("ID not found")
        return

    } 
	else if (Object.keys(object).length === 0) {
        console.log('console log 1')
        res.status(400).send("Bad request. Cannot send empty body")
        return
    //kolla om ID finns i databasen
    } 

      await db.collection('Hamsterwar').doc(id).set(object, {merge: true})
     res.sendStatus(200)

			
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
	  // Du behöver ID
	  const id = req.params.id
	  const docRef = db.collection('Hamsterwar').doc(id)
  
	  const doc = await docRef.get();
  
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

})



module.exports = router