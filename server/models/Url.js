const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  shortened: {
    type: String,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    createIndexes: { expires: '5m' },
  },
});

module.exports = mongoose.model('Url', urlSchema);
