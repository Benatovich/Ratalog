const { Router } = require('express');
const Rat = require('../models/Rat');

module.exports = Router()
  .post('/', async (req, res) => {
    const rat = await Rat.insert(req.body);
    res.json(rat);
  });
