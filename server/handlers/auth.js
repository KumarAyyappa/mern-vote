const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const db=require('../models');

exports.register=async (req,res,next)=>{
    try{
        const user=await db.User.create(req.body);
        const {id,username} = user;

        let key=new Buffer(process.env.SECRET,"base64");


        const token=jwt.sign({id,user},key);

        res.status(201).json({id,username,token});
    }catch(err){
        if(err.code===11000){
            err.message='Sorry, the username is alreay taken';
        }
        next(err);
    }
}

exports.login=async (req,res,next)=>{
    try{
        const user=await db.User.findOne({username:req.body.username});
        const {id,username}=user;

        console.log(`${req.body.password} and ${user.password}`);
        const valid=await bcrypt.compare(req.body.password,user.password);
        if(valid){

            let key=new Buffer(process.env.SECRET,"base64");

            const token=jwt.sign({id,username},key);

            res.json({
                id,
                username,
                "action":"success",
                token
            });
        }
        else{
           // handle.CustomError.prototype=Object.create(Error.prototype);
            //throw new handle.CustomError('Login Failed','Invalid Credentials')
            //handle.CustomError=new handle.CustomError('Login Failed','Invalid Credentials');
            //throw handle.CustomError;
           // handle.CustomError.prototype=Object.create(Error.prototype);
            //throw new CustomError('Login Failed','Invalid Credentials');
            throw new Error();
        }

    }
    catch(err){
        err.message='Invalid Username or Password';
        next(err);
        
    }
}
/*
Tried to get error name, description, message but failed and it's working differently

var stringifyError = function(err, filter, space) {
    var plainObject = {};
    Object.getOwnPropertyNames(err).forEach(function(key) {
      plainObject[key] = err[key];
    });
    return JSON.stringify(plainObject, filter, space);
  };
*/