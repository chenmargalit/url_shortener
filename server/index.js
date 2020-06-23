const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const Url = require('./models/Url');
const create = require('./routes/create');
const fetch = require('./routes/fetch');
const deleteUrls = require('./routes/delete');

// connection to mongoDB
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log('DB connected');
    }
  )
  .catch((err) => console.log('problem with db', err));

// enable express
const app = express();

// enable cors middleware
app.use(cors());
// parse incoming data
app.use(bodyParser.json());

app.use('/create', create);
app.use('/fetch', fetch);
app.use('/delete', deleteUrls);

app.get('/', (req, res) => {
  res.send('works');
});

// shortening of a url is based on this function. It generates a new url with my host (localhost:5000), a signal (wopa) and fetched the original url that should be redirected to
app.get('/:url', async (req, res) => {
  const dataFromDB = await Url.findOne({
    shortUrl: `http://localhost:5000/${req.params.url}`,
  });
  //
  res.redirect(dataFromDB.originalUrl);
});

app.listen(5000, () => {
  console.log('server listens on 5000');
});
