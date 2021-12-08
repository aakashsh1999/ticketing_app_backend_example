const jwt = require('jsonwebtoken');
const conn = require("../../db");

// tickets insert 

const t_insert = async (req, res, next )=>{
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
    const decoded = jwt.verify(theToken, 'theSuperSecretPassword')
     description = req.body.description;
     account_id = req.body.account_id;
     creation_date = req.body.creation_date;
     assigned_user_id = req.body.assigned_user_id;
  //console.log(description , account_id , assigned_user_id , decoded.id)
  var sql = `insert into tickets (description, account_id, creation_date, user_id, assigned_user_id) values('${description}','${account_id}','${creation_date}','${decoded.id}','${assigned_user_id}')`;
  await conn.query(sql,(err,result)=>{
    if(!err){
      return res.json({message: "data inserted succesfully"})
    }
    else{
      res.json({message: "data not inserted"})
    }
  })
  console.log(sql)
  } catch(err){
    next(err);
}
}
 // select all data
 const tickets = async (req,res,next) => {

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
          await conn.query("SELECT * FROM tickets",(err ,result)=>{
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