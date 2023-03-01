const userModel = require ('../models/userModel');
const eventModel = require('../models/eventModel');
const ObjectId = require('mongoose').Types.ObjectId
const jwt = require('jsonwebtoken')


const createEvent = async function(req,res){
    try{
    let eventData = req.body;
    if(Object.keys(eventData).length == 0) return res.status(400).send({status : false, msg : "Pleasse enter the details of the event"})

    //sportname
    if(!eventData.sportName) return res.status(400).send({status:false,msg:"name of the sport is not present"})
    if(eventData.sportName.trim().length == 0) return res.status(400).send({status:false,msg:"enter the name in proper format"})

    
    // Validation of userId
    if(!eventData.userId) return res.status(400).send({status:false,msg:'enter the userId of the event'})
    if(!ObjectId.isValid(eventData.userId.trim())) return res.status(400).send({status:false,msg:'userId is not valid'})
    
    // authorization
    let token = req.headers["x-api-key"]
    let decodedToken = jwt.verify(token, "secret-key", {ignoreExpiration: true})
    if(eventData.userId.trim() != decodedToken.userId) return res.status(401).send({status:false, msg:'You are not authorized to make the changes'})
    let user = await userModel.findOne({_id:eventData.userId.trim()})
    if(!user) return res.status(400).send({status : false, msg: 'user with this userId doesnot exist'})


    // format of regx == "YYYY-MM-DD"
    if(!eventData.eventTime) return res.status(400).send({status:false,msg:'enter the date of event'})
    if(!(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(eventData.eventTime.trim()))){
        return res.status(400).send({status:false,msg:"event Date is not valid"})
    }

    if(Object.keys(eventData).includes('address')){
        if(Object.keys(eventData.address).includes('pincode')){
          if(eventData.address.pincode.trim().length !=6) return res.status(400).send({status:false,msg:'pincode length should be 6 digits'})
        }
       } 

    
    let data = await eventModel.create(eventData)

    return res.status(201).send({status:true,msg:'success',data : data})
}catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}



const getEvent = async function (req, res) {
    try {
      if (Object.keys(req.query).length == 0) {
        let result = await eventModel.find()
        if (result.length != 0)
          return res.status(200).send({status:true, data: result})
        if (result.length == 0)
          return res.status(400).send({ status: false, msg: "No event found" })
      }
  
      let eventKeys = ["sportName", "userId"]
      for (let i = 0; i < Object.keys(req.query).length; i++) {
        let keyPresent = eventKeys.includes(Object.keys(req.query)[i])
        if (!keyPresent)
          return res.status(400).send({ status: false, msg: "Wrong Key present" })
      }
  
      
  
      let result = await BlogModel.find(req.query)
      if (result.length != 0)
        return res.status(200).send({status : true, data: result});
  
      if (result.length == 0)
        return res.status(404).send({ status: false, msg: " No event data found" })
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message })
    }
  }
  

module.exports.createEvent = createEvent
module.exports.getEvent = getEvent