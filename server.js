const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./route/hamsters.js')
const matches = require('./route/matches.js')
const winners = require('./route/winners.js')
const losers = require('./route/losers.js')
const matchWinner = require('.route/matchWinner.js')

const PORT = process.env.PORT || 1337
const staticFolder = path.join(__dirname, 'static')

//Middleware läggs alltid FÖRE endpoints

app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url}`, req.params);
    next()
})

app.use(express.json())
app.use(cors())
app.use( express.static(staticFolder) )

//Startar upp routes
app.use('/hamsters', hamsters)
app.use('/matches', matches)
app.use('/winners', winners)
app.use('/losers', losers)
app.use('matchWinner', matchWinner)

//Hämtar root filen(/) så att den kan visas i porten
//GET registrerar en Route
//GET måste alltid ha en send annars kommer det bli en timeout
app.get('/', (req, res) => {
	console.log('GET /');
 res.send('Yes i am  here')
})



//Startar upp servern
app.listen(PORT, () => {
	console.log('Server is listening on ' +  PORT)
})




 
