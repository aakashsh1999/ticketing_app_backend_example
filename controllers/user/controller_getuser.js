const jwt = require('jsonwebtoken');
const conn = require('../../db')
//find user
const getUser = async (req,res,next) => {
 console.log("ok")
    try{
       
        if(
            
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){ 
            return res.status(422).json({
                message: "Please provide the token",
            });
        }
       const theToken = req.headers.authorization.split(' ')[1];
      
         const decoded = jwt.verify(theToken, 'theSuperSecretPassword');
        console.log(decoded.id)
         await conn.query("SELECT * FROM user ",(err ,result)=>{
            const rows = result;
            console.log(rows)
            if(rows.length > 0){
            return res.json({rows})
            }
            res.json({ message:"No user found" });
         }); 
    }
    catch(err){
        next(err);
    }
}
 module.exports = getUser;