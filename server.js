const express = require('express')
const app = express()

const hamsters = require('./route/hamsters.js')

const PORT = 1337

//Hämtar root filen(/) så att den kan visas i porten
//GET registrerar en Route
//GET måste alltid ha en send annars kommer det bli en timeout
app.get('/', (req, res) => {
	console.log('GET /');
 res.send('Yes i am  here')

})

app.get('/hamsters', (req,res) => {
	console.log('This is Hamsters');
	res.sendFile(__dirname + '/route/hamsters.js')
})
//__dirname är till för att veta var man befinner sig och då visar
//variabeln var man befinner sig fram till

app.use('/hamsters', hamsters)

//Startar upp servern
app.listen(PORT, () => {
	console.log('Server is listening on ' +  PORT)
})



 
