const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.get('/getAll', async (req, res) => {
  try {
    // fetch everything from db
    const urls = await Url.find({});
    res.send(urls);
  } catch (e) {
    console.log('error while trying to fetch all from db');
    res.status(500).send('problem with fetching data from db', e);
  }
});

module.exports = router;
