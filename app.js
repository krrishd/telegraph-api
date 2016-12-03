'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let PORT = process.env.PORT || 1337;

let scraper = require('./scraper');

app.post('/', (req, res) => {
  if (!req.body.link) {
    return res.status(400)
      .json({
        'error': 'Bad request.'
      });
  }

  scraper(req.body.link, (error, result) => {
    if (error) {
      return res.status(400)
        .json(error);
    }
    res.json(result)
  });

});

app.post('/meta', (req, res) => {
  if (!req.body.link) {
    return res.status(400)
      .json({
        'error': 'Bad request.'
      });
  }

  scraper(req.body.link, (error, result) => {
    if (error) {
      return res.status(400)
        .json(error)
    }
    res.json({
      title: result.title,
      author: result.author,
      dates: result.dates
    });
  });
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
