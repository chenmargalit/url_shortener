const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.delete('/deleteAll', async (req, res) => {
  try {
    // delete everything from db
    await Url.deleteMany({});
    res.send('everything deleted');
  } catch (e) {
    console.log('probelm with deleting all form db');
    res.status(500).send('problem with deleting');
  }
});

module.exports = router;
