const express = require('express')
const router = express.Router()



const db = 

router.get('/', (req, res) => {
console.log('GET /hamsters/');
	res.send('hej')
})
module.exports = router