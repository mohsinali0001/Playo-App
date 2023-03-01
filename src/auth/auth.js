const jwt = require('jsonwebtoken')

const ObjectId = require('mongoose').Types.ObjectId

const authentication = async function(req,res,next){
    try{
        let token = req.headers["x-api-key"]
        if(!token) return res.status(400).send({status:false,msg:'enter the token in header'})
        let decodedToken = jwt.verify(token, "secret-key", {ignoreExpiration: true})
        let exp = decodedToken.exp
        let iatNow = Math.floor(Date.now() / 1000)
        if(exp<iatNow) return res.status(401).send({status:false,msg:'Token is expired now'})
        next()
    }catch(error){
        return res.status(500).send({status:false, msg:error.message})
    }
}




module.exports.authentication = authentication;



