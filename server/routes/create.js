const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');
const {
  validateUrl,
  isShorterCalculator,
  doesUrlExist,
  fetchRedirectUrl,
} = require('../utils/utilFunctions');

router.post('/createUrl', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const isUrlValid = validateUrl(originalUrl);
    if (isUrlValid) {
      // check if url already exists
      const doesExist = await doesUrlExist(originalUrl);
      if (doesExist) {
        const getRedirectionUrl = await fetchRedirectUrl(originalUrl);
        res.status(200).send(`Url exists', ${getRedirectionUrl}`);
      } else {
        // base url to build upon
        const homeUrl = 'http://localhost:5000/';
        // generate a random string to be the new url
        const shortUrl = homeUrl + shortid.generate();
        const shortened = isShorterCalculator(originalUrl, shortUrl);
        await new Url({
          shortUrl,
          originalUrl,
          shortened,
        }).save();
        res.send(shortUrl);
      }
    } else {
      throw new Error('url not valid');
    }
  } catch (e) {
    console.log('problem saving things to db', e);
    res.status(500).send('url not valid');
  }
});

module.exports = router;
