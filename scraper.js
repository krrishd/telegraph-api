'use strict';

let cheerio = require('cheerio');
let request = require('request');

module.exports = (link, callback) => {
  let telegraphRegexp = new RegExp(/http:\/\/telegra.ph\//g);
  
  if (!telegraphRegexp.test(link)) {
    return callback({
      'error': 'Link was invalid.'
    }, null);
  }

  request(link, (error, response, body) => {
    if (error) {
      return callback({
        'error': error
      }, null);
    }

    let $ = cheerio.load(body);
    let title = $('meta[property="og:title"]').attr('content');
    let author = $('meta[property="article:author"]').attr('content');
    let content = $('#tl_editor').html().split('</address>')[1];
    let dates = {
      published: $('meta[property="article:published_time"]').attr('content'),
      modified: $('meta[property="article:modified_time"]').attr('content')
    };

    return callback(null, {
      title,
      author,
      content,
      dates
    });
  });
};
