const express = require('express')

const router = express.Router()

const userController = require("../controller/userController")
const eventController = require("../controller/eventContoller")
const auth = require('../auth/auth')

// user api
router.post('/register',userController.createUser)
router.post('/loginUser',userController.loginUser)

// create event
router.post('/events',auth.authentication,eventController.createEvent)
router.get('/getevents', auth.authentication,eventController.getEvent)



module.exports=router

