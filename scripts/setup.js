'use strict';

/**
 * Creates a local env file with mock settings.
 *
 * DO NOT USE THESE MOCK VALUES IN YOUR APP. REPLACE WITH YOURE OWN.
 */

const fs = require('fs');
const debug = require('debug')('Script:Setup');

debug('writing .env');

module.exports = fs.open('.env', 'wx', (err, fd) => {
  if (err) {
    return err.code === 'EEXIST' ?
      debug('error', 'file already exists') :
      debug('error', err);
  }

  fs.readFile('.env.starter', 'utf8', (err, data) => {
    if (err) {
      return debug('error', err);
    }

    fs.write(fd, data, 'utf8', err => (
      err ? debug('error', err) : debug('file successfully created')
    ));
  });
});
