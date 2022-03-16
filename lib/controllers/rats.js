const { Router } = require('express');
const Rat = require('../models/Rat');

module.exports = Router()
  .post('/', async (req, res) => {
    const rat = await Rat.create(req.body);
    res.json(rat);
    // should it be res.send(rat)?
  })

  .get('/', async (req, res) => {
    const rat = await Rat.getAll(req.body);
    res.json(rat);
  });
