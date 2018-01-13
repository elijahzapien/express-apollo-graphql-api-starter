'use strict';

const path = require('path');
const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const helmet = require('helmet');
const compress = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv/config');
require('./database/connect');

const authenticationController = require('./controllers/authentication');
const authenticationMiddleware = require('./middleware/authentication');

const schema = require('./graphql/schema');

const server = express();

server.use(helmet());
server.use(compress());
server.use(morgan('combined'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

/**
 * Add authentication middleware
 */
server.use(authenticationMiddleware);

/*
 * Add authentication controller
 */
server.use(authenticationController);

/*
 * Add GraphQL controller
 */
server.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    }
  }))
);

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    // Verified token of mock user for testing purposes
    passHeader: '"x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkOTc2MTFhLTRiNGYtNDQ2Mi05MGMxLTE0NTU4OWY3ZDU1YiIsInVzZXJuYW1lIjoiZGV2aW5hbGR5IiwiZW1haWwiOiJkZXZpbmFsZHlAY21haWwuY29tIiwiaWF0IjoxNTEzNDc1NDE1fQ.HSQEAGrMYXs2-6-bEIasTdEzmjEYAbKi2FveBGLUgsE"'
  })
);

/*
 * Listen for connections on specified host and port.
 */
const port = process.env.PORT || 3000;
const instance = server.listen(port, error => {
  if (error) {
    console.error(error.stack || error);
    throw error;
  }

  console.info('GraphQL server listening on port %s', port);
});

module.exports = instance;
