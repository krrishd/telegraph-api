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
    
    return callback(null, {
      title,
      author,
      content
    });
  });
};
