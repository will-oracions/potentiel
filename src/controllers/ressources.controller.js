const Router = require('express').Router();
const Ressource = require('../models/ressource.model');

Router.get('/', async (req, res) => {
    const ressources = await Ressource.find({});

    res.json({
        count: ressources.length,
        ressources,
    });
});

module.exports = Router;