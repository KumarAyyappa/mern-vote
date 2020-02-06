const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middlewares/auth');


router.route('/').get(handle.showpolls).post(auth, handle.createPoll);

router.route('/user').get(auth, handle.showuser);

router.route('/:id').get(handle.getpoll).post(auth, handle.vote).delete(auth, handle.deletepoll);

module.exports = router;
