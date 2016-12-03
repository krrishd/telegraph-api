'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

// ## CORS middleware
// 
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

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
