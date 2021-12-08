const jwt = require('jsonwebtoken')
const conn = require("../../db");

const send =(req,res)=>{
    console.log("API test")
}

// account insert
const a_insert = (req, res )=>{
    let data = {};
    data.name = req.body.name;
   data.ms_start_date = req.body.ms_start_date;
    data.is_active = req.body.is_active;
    data.owner_user_id = req.body.owner_user_id;
    data.assigned_user_id = req.body.assigned_user_id;
    console.log(data)
   //console.log(data.description , data.account_id , data.creation_date , data.user_id , data.assigned_user_id)
   var sql = `INSERT INTO accounts (name, ms_start_date, is_active, owner_user_id) VALUES ('${data.name}','${data.ms_start_date}','${data.is_active}','${data.owner_user_id}')`;
        conn.query(sql, (err)=>{
          if(!err){
         res.send("data insered")
        
          }else{
            res.send(err)
            console.log(err)
          }
        })
  }

  const a_select = async (req,res,next) => {
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
            await conn.query("SELECT * FROM accounts",(err ,result)=>{
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
const a_delete = (req,res)=>{
    var id = req.params.acc_id;
      var sql = `delete from accounts where acc_id = '${id}'`;
      conn.query(sql,(err)=>{
        res.send("deleted data")
        
      })
    }
  
module.exports ={send , a_insert ,a_select ,a_delete}