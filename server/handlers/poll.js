const db = require('../models');


exports.showpolls = async (req,res,next) => {
    try{
        const polls = await db.Poll.find().populate('user', ['id', 'username']);

        res.status(200).json(polls);

    } catch(err) {
        err.status = 400;
        next(err);
    }
}
exports.createPoll = async (req, res, next) => {
    try {
        const{id} = req.decoded;

        const {question, options} = req.body;

        const user = await db.User.findById(id);
        
        const poll = await db.Poll.create({
            user,
            question,
            options: options.map(option => ({
                option,
                votes:0
            }))
        });

        user.polls.push(poll._id);
        await user.save();

        res.status(201).json({...poll._doc, user: user._id});
    } catch(err) {
        err.status =  400;
        next(err);
    }
}

exports.showuser = async(req, res, next) => {
    try {
        const {id} = req.decoded;

        const user = await db.User.findById(id).populate('polls');

        res.status(200).json(user.polls);
    } catch(err)  {
        err.status = 400;
        next(err);
    }

}

exports.getpoll = async(req, res, next) => {
    try {
        const{id} = req.params;

        const poll = await db.Poll.findById(id).populate('user', ['username', 'id']);

        if (!poll) {
            throw new Error("Requested Poll Doesnot Found");
        }

        res.status(200).json({
            poll
        });
    } catch(err) {
        err.status = 400;
        next(err);
    }
}

exports.deletepoll = async (req,res,next) => {
    try {

        const{id: pollId} = req.params;
        const{id: userID} = req.decoded;

        const poll = await db.Poll.findById(pollId);

        if (!poll) {
            throw new Error(`Requested Poll Doesn't found`);
        };

        

        if (poll.user.toString() !== userID) {
            throw new Error('unAuthorized access');
        }

        console.log(poll);

        const polls = poll;

        await poll.remove();

        res.status(202).json({
            polls
        })
    } catch(err) {
        err.status = 400;
        next(err);
    }
}

exports.vote = async (req,res,next) => {
    try {
        const {id: pollId} = req.params;
        const {id: userId} = req.decoded;
        const {answer} = req.body;

        if (answer) {
            const poll = await db.Poll.findById(pollId);
            if (!poll) {
                throw new Error('No poll found');
            }

            const vote = poll.options.map(option => {
                if (option.option === answer) {
                    return {
                        option: option.option,
                        _id: option._id,
                        votes: option.votes+1
                    };
                } else {
                    return option;
                }
            });
            if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
                poll.voted.push(userId);
                poll.options = vote;
                await poll.save();
                res.status(200).json({
                    poll
                });
            } else {
                throw new Error('Already voted');
            }

        } else {
            throw new Error('Answer not provided');
        }
    } catch(err) {
        err.status = 400;
        next(err);
    }

}