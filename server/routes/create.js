const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');
const validUrl = require('valid-url');

const validateUrl = (inputUrl) => {
  return validUrl.isUri(inputUrl);
};

const isShorterCalculator = (originalUrl, shortUrl) => {
  // check if the shortener has actually shortened the link
  const isShorter = originalUrl.length - shortUrl.length;
  return isShorter > 0 ? '😁' : '😢';
};

router.post('/createUrl', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const isUrlValid = validateUrl(originalUrl);
    if (isUrlValid) {
      // base url to build upon
      const homeUrl = 'http://localhost:5000/wopa/';
      // generate a random string to be the new url
      const shortUrl = homeUrl + shortid.generate();
      const shortened = isShorterCalculator(originalUrl, shortUrl);
      await new Url({
        shortUrl,
        originalUrl,
        shortened,
      }).save();
      res.send(shortUrl);
    } else {
      throw new Error('url not valid');
    }
  } catch (e) {
    console.log('problem saving things to db', e);
    res.status(500).send('url not valid');
  }
});

module.exports = router;
