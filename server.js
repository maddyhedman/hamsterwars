const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const hamsters = require('./route/hamsters.js')

const PORT = 1337

//Middleware läggs alltid FÖRE endpoints
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
//Middleware
app.use((req, res, next) =>{
    console.log(`${req.method} ${req.url}`, req.params);
    next()
})

app.use(express.json())
app.use(cors())


//Hämtar root filen(/) så att den kan visas i porten
//GET registrerar en Route
//GET måste alltid ha en send annars kommer det bli en timeout
app.get('/', (req, res) => {
	console.log('GET /');
 res.send('Yes i am  here')
})

// app.get('/hamsters', (req,res) => {
// 	console.log('This is Hamsters');
// 	// res.sendFile(__dirname + '/route/hamsters.js')
// 	res.send(db)
// })
//__dirname är till för att veta var man befinner sig och då visar
//variabeln var man befinner sig fram till



//Startar upp servern
app.listen(PORT, () => {
	console.log('Server is listening on ' +  PORT)
})


//Startar upp routes
app.use('/hamsters', hamsters)
 
