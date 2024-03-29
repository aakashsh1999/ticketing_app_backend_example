const bcrypt = require('bcrypt')
const conn = require('../../db')
const {validationResult} = require('express-validator')
const register = async(req, res, next) =>{
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(422).json({error: error.array()});
    }

    try{

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
         conn.query(`SELECT email FROM user WHERE email = '${email}'`, async (err, result)=>{
            if(err) throw err;
            console.log(result);
            if(result.length == 1){
               return res.status(201).json({message:"Email is already registered with us"});
            }

            else{
                const hash = await bcrypt.hash(password, 12)
                 conn.query(`INSERT INTO user (user_name, email, password) VALUES('${name}', '${email}', '${hash}')`, (err, match)=>{
                    if(!err){
                        res.json({message:"Data inserted successfully"})
                       
                    }
                    
                   
                });
            }

        });
    }
    catch(err){
        next(err);
    }
}

module.exports= register;