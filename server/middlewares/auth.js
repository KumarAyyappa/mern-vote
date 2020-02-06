const jwt=require('jsonwebtoken');

const config = require('../config');

module.exports=(req,res,next)=>{
    if(req.headers['authorization']){
        if(req.headers.authorization.startsWith('Bearer ')){
            const token=req.headers.authorization.substring(7,req.headers.authorization.length);
            var secret=new Buffer(config.SECRET,"base64");
            jwt.verify(token,secret,(err,decoded)=>{
                if(err){
                    next(Error('Failed to authenticate token'));
                }else{
                    req.decoded=decoded;
                    next();
                }
            })
        }else{
            next(Error("Not Authorized user"));
        }
    }else{
        next(Error('No token provided'));
    }
}