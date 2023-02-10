const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user.model');

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const passwordCorrect = user === null 
        ? false
        : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
        return res.status(400).json({
            error: 'invalid username or password',
        });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    res.status(200).send({
        username: user.username,
        name: user.name,
        token,
    });
});

module.export = loginRouter;