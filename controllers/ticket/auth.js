
const jwt = require('jsonwebtoken')
const verifyToken=(req,res,next)=>{
    const tokenHeader = req.headers.authorization;
   // const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if(!tokenHeader)
    return res.status(401).json({"message":"Token not found"});
    const token = tokenHeader.split(" ")[1];
    const verifiedToken = jwt.verify(token , 'theSuperSecretPassword');
    if(!verifiedToken.id)
      return res.status(401).send({status:0,msg:"Invlaid TOken"})
    res.locals.auth = verifiedToken;
    return(res.locals.auth);
  }
  module.exports ={ verifyToken }