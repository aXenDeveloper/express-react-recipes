const router = require('express').Router();
const csrf = require('./csrf');

router.get('/', csrf, (req, res) => {
    res.json({
        post: 'myfirstpost',
        message: 'test',
        test: req.memberID
    });
});

module.exports = router;