const validUrl = require('valid-url');
const Url = require('../models/Url');

const validateUrl = (inputUrl) => {
  return validUrl.isUri(inputUrl);
};

const isShorterCalculator = (originalUrl, shortUrl) => {
  // check if the shortener has actually shortened the link
  const isShorter = originalUrl.length - shortUrl.length;
  return isShorter > 0 ? '😁' : '😢';
};

const doesUrlExist = async (originalUrl) => {
  const doesExist = await Url.findOne({ originalUrl: originalUrl });
  return doesExist;
};

const fetchRedirectUrl = async (originalUrl) => {
  const getUrl = await Url.findOne({ originalUrl });
  return getUrl.shortUrl;
};

module.exports = { validateUrl, isShorterCalculator, doesUrlExist, fetchRedirectUrl };
