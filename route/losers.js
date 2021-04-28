const express = require('express')
const router = express.Router()

//importera databas från database.js
const getDatabase = require('../database.js')
//anropa funktionen
const db = getDatabase();



module.exports = router