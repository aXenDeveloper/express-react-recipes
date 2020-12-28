const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// Import models
const Member = require('../models/core_members');
const Session = require('../models/core_session');

router.post('/register', async (req, res) => {
    const emailExist = await Member.findOne({
        email: req.body.email
    });
    if (emailExist) return res.status(400).json({
        error: true,
        message: 'Email already exist!'
    });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const createMember = new Member({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        date: req.body.date
    });

    try {
        await createMember.save();
        res.json({
            message: 'Created account success!',
            id_member: createMember._id,
            error: false,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const memberExist = await Member.findOne({
        email: req.body.email
    });

    const validPassword = await bcrypt.compare(req.body.password, memberExist.password);

    if (!memberExist || !validPassword) return res.status(400).json({
        error: true,
        message: 'Email or password is wrong!'
    });

    const token = jwt.sign({ _id: memberExist._id }, process.env.CSRF_TOKEN);
    res.header('CSRF-token', token);

    const createCSRF = new Session({
        id: memberExist._id,
        token
    });

    try {
        await createCSRF.save();

        res.json({
            message: 'Logged in!',
            member: memberExist,
            CSRF_token: token,
            error: false,
        });
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;