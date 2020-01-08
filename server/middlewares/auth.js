const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    if(req.headers['authorization']){
        console.log(`original token without splitting ${req.headers.authorization}`);


        //the split method is not working ine the below code
        //const token=req.headers.authorization.split(' ')[1];

        if(req.headers.authorization.startsWith('Bearer ')){
            const token=req.headers.authorization.substring(7,req.headers.authorization.length);
            //token=req.headers.authorization;
            console.log(`token ---- ${token} \n secret is ${process.env.SECRET}`);
            var secret=new Buffer(process.env.SECRET,"base64");
            jwt.verify(token,secret,(err,decoded)=>{
                console.log(`Error is ${err}\n decoded is ${decoded}`);
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