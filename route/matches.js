// const express = require('express')
// const router = express.Router()

// //importera databas från database.js
// const getDatabase = require('../database.js')
// //anropa funktionen
// const db = getDatabase();




// //GET VG DEL
// router.get('/', async (req, res) => {
    
// 		const hamstrarRef = db.collection('matches');
// 		const snapshot = await hamstrarRef.get();
	
// 		if (snapshot.empty) {
// 			res.send([])
// 			return
// 		}
// 		items = []
	
// 		snapshot.forEach(doc => {
// 			const data = doc.data()
// 			data.id = doc.id //ID behövs för POST, PUT, DELETE
// 			items.push(data)
// 		})
// 		res.status(200).send(items)	

// })

// router.get('/:id', async (req, res) => {
//      const id = req.params.id
// 	 const docRef =  await db.collection('matches').doc(id).get()
     
// 	 //felmeddelande
// 	 if(!docRef.exists) {
// 		 res.status(404).send('Match not found')
// 		 return
// 	 }

// 	 const data = docRef.data()
// 	 res.send(data)
	

// })

// //POST
// router.post('/', async (req, res) => {
	
// 	const match = req.body
// 	const docRef = await db.collection('matches').add(match)

// 	if(!docRef.exists) {
// 		res.status(404).send('Oops')
// 		return
// 	}
//     console.log('The document id is: ' + docRef.id)
// 	res.send(docRef.id)

// //POST /matches
// // router.post('/', async (req, res) => {
// //     const match = req.body

// //     // utan att ange id
// //     const docRef = await db.collection('Matches').add(match)
// //     console.log('The document id is: ' + docRef.id)

// //     if (!docRef.exists) {
// //         res.status(400).send("Ooops. Something went wrong")
// //         return
// //     }
// //     res.status(200).send(docRef.id)


// //     //TODO - KOLLA ATT DET ÄR ETT KORREKT MATCHOBJEKT
// // })
// })

// module.exports = router