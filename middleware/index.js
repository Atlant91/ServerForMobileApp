const admin=require("firebase-admin");
class Middleware{
    async decodeToken(req,res,next){
        const token = req.headers.authorization.split(" ")[1];
        try{
        const decodedToken=await admin.auth().verifyIdToken(token);
        console.log(decodedToken);
        if(decodedToken){
            return next();
        }
        return res.json({message:"Un authorized"});
    }catch(error){
        return res.json({message:"Internal error"});
    }
}
}
module.exports=new Middleware();