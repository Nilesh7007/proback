

const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{

    const token = req.headers.authorization
if(token){
    try {
        const decoded =  jwt.verify(token, 'masai')
       if(decoded){
        // console.log(decoded)
        req.body.autherID=decoded.autherID
        req.body.auther = decoded.auther
           next()
        }
        else{
            res.status(200).json({"msg":"please login!!"})
        }
    } catch (err) {
        res.send({"err":err.message})
    }
}

    else{
          res.send({"msg":"please login!!"})
    }
}

module.exports  = {auth}
   

