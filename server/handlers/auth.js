const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = require('../models');

exports.register = async (req,res,next) => {
    try{
        const user = await db.User.create(req.body);
        const {id,username} = user;

        let key=new Buffer(config.SECRET,"base64");


        const token = jwt.sign({id, user}, key);

        res.status(201).json({
            id,
            username,
            token
        });

    }catch(err){
        if(err.code === 11000){
            err.message = 'Sorry, the username is alreay taken';
        }
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try{
        const user = await db.User.findOne({username:req.body.username});
        const {id,username} = user;

        const valid = await bcrypt.compare(req.body.password, user.password);
        if (valid) {
            let key = new Buffer(process.env.SECRET, "base64");
            const token=jwt.sign({id,username},key);
            res.json({
                id,
                username,
                "action": "success",
                token
            });
        }
        else {
            throw new Error();
        }

    }
    catch(err) {
        err.message = 'Invalid Username or Password';
        next(err);
        
    }
}
