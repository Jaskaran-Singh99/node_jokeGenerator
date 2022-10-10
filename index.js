const express = require('express')
const  router = require('./routes/route')
const app = express()

// Middleware
app.use(express.json())

// Using static html and css files
app.use(express.static('./public'))

//Router
app.use('/', router)

const port = 3000;
app.listen(port, '127.0.0.1')