const jwt = require('jsonwebtoken')
const conn = require("../../db");
const { verifyToken } = require('../ticket/auth');
//const {verifyToken} = require('./ticket/auth')

const send =(req,res)=>{
    console.log("API test")
}

// account insert
const a_insert = async(req, res, next )=>{
  try{
    const auth = verifyToken(req, res);
    name = req.body.name;
    ms_start_date = req.body.ms_start_date;
    is_active = req.body.is_active;
    console.log(name , ms_start_date , is_active , auth.id )
    
    //owner_user_id = req.body.owner_user_id;
   var sql = `INSERT INTO accounts (name, ms_start_date, is_active, owner_user_id) VALUES ('${name}','${ms_start_date}','${is_active}','${auth.id}')`;
        conn.query(sql, (err)=>{
          if(!err){
         res.send("data insered")
        
          }else{
            res.send(err)
            console.log(err)
          }
        })
  }catch(err){
    next(err)
  }
}

  const a_select = async (req,res,next) => {
       try{
          const auth = verifyToken(req, res);
             conn.query("SELECT * FROM accounts",(err ,result)=>{
               if(result.length > 0){
                   return res.json({ result});
               }
               res.json({ message:"No user found" });
            }); 
       }
       catch(err){
           next(err);
       }
   }
  // account delete data from id
const a_delete = async(req,res)=>{
  try{
    const auth = verifyToken(req, res);
    var id = req.params.acc_id;
    var sql = `delete from accounts where acc_id = '${id}'`;
    conn.query(sql,(err)=>{
      if(!err){
        res.send("account delete")
      }
      
    })

  }catch(err){
    next(err)
  }
}



module.exports ={send , a_insert ,a_select ,a_delete}