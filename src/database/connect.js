'use strict';

/**
 * Database connect.
 * @module
 */

const debug = require('debug')('DB');
const mongoose = require('mongoose');

debug('connecting');

mongoose.Promise = require('bluebird');

mongoose.connect(process.env.DB_URI, { useMongoClient: true, });

mongoose.connection.on('connected', () => debug('connection open'));

mongoose.connection.on('error', err => debug('error', err));

mongoose.connection.on('disconnected', () => debug('disconnected'));
