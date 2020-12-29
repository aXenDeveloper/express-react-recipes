const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const csrf = require('./csrf');

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

        return res.json({
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

    if (!memberExist) return res.status(400).json({
        error: true,
        message: 'Email or password is wrong!'
    });

    const validPassword = await bcrypt.compare(req.body.password, memberExist.password);

    if (!validPassword) return res.status(400).json({
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

        return res.json({
            message: 'Logged in!',
            member: memberExist,
            CSRF_token: token,
            error: false,
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/verifyCSRF', async (req, res) => {
    const sesionExist = await Session.findOne({
        token: req.header('CSRF_Token')
    });

    if (!sesionExist) return res.status(401).json({
        error: true,
        message: 'Access denied!'
    });

    return res.json({
        error: false,
        message: 'CSRF Token is correct!'
    });
});

router.delete('/logout', csrf, async (req, res, next) => {
    await Session.findOneAndDelete({
        token: req.header('CSRF_Token')
    });

    try {
        res.json({
            message: 'Successfully logout.',
            error: false,
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;