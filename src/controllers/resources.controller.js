const Router = require('express').Router();
const Ressource = require('../models/resource.model');

Router.get('/', async (req, res) => {
    const resources = await Ressource.find({});

    res.json({
        count: resources.length,
        resources,
    });
});

module.exports = Router;