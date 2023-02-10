const Router = require('express').Router();
const User = require('../models/user.model');
const config = require('../config/app.config');

Router.get('/', async (req, res) => {
    let { page, take } = req.query;

    if (!page) page = 1;
    if (!take) take = config.TAKE;

    const users = await User.find({}).skip((page-1)*take).limit(take);

    res.json({
        count: users.length,
        users,
    });
});

module.exports = Router;