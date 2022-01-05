const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const {validationResult} = require('express-validator');
const conn = require('../../db');

const login = async (req, res, next)=>{
  const error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(422).json({ error : error.array() });
  }

  try{
    const email = req.body.email
    const password = req.body.password
     conn.query(`SELECT * FROM user WHERE email = '${email}'`,  async (err, result)=>{
      if(err) throw err;
      console.log(result)
      console.log(result[0].user_id)
      console.log(result[0].user_name);
      if(result.length > 0){
      await bcrypt.compare(password, result[0].password, (  err, match)=>{
          if(match === true)
          {
            const id = result[0].user_id
            console.log(id)
            const token = jwt.sign({id}, 'theSuperSecretPassword' , {expiresIn: '1h'});
            //const token = jwt.sign({id}, "hhhhhhhh" , {expiresIn: '1h'});
           //console.log(token)
            return res.json({token: token});

          }
          else{
            return res.status(422).json({message:"Incorrect Password"});
          }
        });
      }
      else{
        res.status(422).json('Email does not exist');
      }
  });
}
  catch(err)
  {
    next(err);
  }
}
module.exports= login;