# Telegra.ph API [![Build Status](https://travis-ci.org/krrishd/telegraph-api.svg?branch=master)](https://travis-ci.org/krrishd/telegraph-api) [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

An API endpoint that takes a [telegra.ph](http://telegra.ph) link and returns the data at that link as JSON.

The main reason this exists is because I'd like to be able to write 'blog posts' through an interface like Telegra.ph's without hosting the data myself and being able to display it on any custom client I'd like. Currently, I use it to grab Telegra.ph metadata in my writing section at [itskrish.co](http://itskrish.co)

## How To Use

Once you've deployed the app, simply POST to `/` with `link` in your POST body being your Telegra.ph link. If you're only interested in the metadata (as opposed to including the actual content), just do the same thing but with `/meta` instead.
