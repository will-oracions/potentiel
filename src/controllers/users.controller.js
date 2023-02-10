const Router = require('express').Router();
const User = require('../models/user.model');

Router.get('/', async (req, res) => {
    const users = await User.find({});

    res.json({
        count: users.length,
        users,
    });
});

module.exports = Router;