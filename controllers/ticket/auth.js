const ath= (req,res)=>{
    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ){ 
        return false
    }
    else 
    return true
    
}
module.exports={ath}