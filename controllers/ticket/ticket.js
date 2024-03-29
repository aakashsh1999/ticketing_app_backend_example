const jwt = require('jsonwebtoken');
const conn = require("../../db");
const {verifyToken} = require('./auth')

// tickets insert 

const t_insert = async (req, res, next )=>{
  try{
    const auth = verifyToken(req, res);
     description = req.body.description;
     account_id = req.body.account_id;
     creation_date = req.body.creation_date;
     assigned_user_id = req.body.assigned_user_id;
  //console.log(description , account_id , assigned_user_id , decoded.id)
  var sql = `insert into tickets (description, account_id, creation_date, user_id, assigned_user_id) values('${description}','${account_id}','${creation_date}','${auth.id}','${assigned_user_id}')`;
   conn.query(sql,(err,result)=>{
    if(!err){
      return res.json({message: "data inserted succesfully"})
    }
    else{
      res.json({message: "data not inserted"})
    }
  })
  } catch(err){
    next(err);
}
}
 // select all data
 const tickets = async (req,res,next) => {
     try{
        const auth = verifyToken(req, res);
        console.log(auth.id)
           conn.query("SELECT * FROM tickets",(err ,result)=>{
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
 
// delete data from id
const t_delete =async (req,res, next)=>{
  try{
  const auth = verifyToken(req, res);
  var id = req.params.ticket_id;
  var sql = `delete from tickets where ticket_id = '${id}'`;
  conn.query(sql,(err)=>{
    if(!err){
       res.send("deleted data")
    }
  })

  }catch(err){
    next(err)
  }
 
}
// update ticket   
const t_update = async (req, res ,next) => {
  try{
  const auth = verifyToken(req, res);
  var id = req.params.ticket_id;
  description = req.body.description;
  account_id = req.body.account_id;
  creation_date = req.body.creation_date;
  assigned_user_id = req.body.assigned_user_id;
var sql = `update tickets set description = '${description}', account_id = '${account_id}', creation_date = '${creation_date}', user_id = '${decoded.id}', assigned_user_id = '${assigned_user_id}' where ticket_id = '${id}'`;
conn.query(sql, (err)=>{
  if(!err){
    res.send("data updated")
  }
})
  }catch(err){
    next(err)
  }
};
module.exports = { t_insert, tickets, t_delete ,t_update}