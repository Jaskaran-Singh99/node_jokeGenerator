const express = require('express')
const router = express.Router()
const {homePage, fetchJoke} = require('../controller/quotes')

router.route('/').get(homePage)
router.route('/jokes').get(fetchJoke)

module.exports = router