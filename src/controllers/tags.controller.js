const Router = require('express').Router();
const Tag = require('../models/tag.model');

Router.get('/', async (req, res) => {
    const tags = await Tag.find({});

    res.json({
        count: tags.length,
        tags,
    });
});

module.exports = Router;