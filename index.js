const express = require('express');
const Sentry = require('@sentry/node');
const Rollbar = require('rollbar');
const get = require('lodash/get');

const app = express();

Sentry.init({ dsn: process.env.SENTRY_INGESTION_URL });

app.use(express.json());
app.use(Sentry.Handlers.requestHandler());

var rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
});

// All controllers should live here
app.get('/', function rootHandler(req, res) {
  res.json({
    message: 'Hello world!',
  });
});

app.post('/debug-sentry', function mainHandler(req, res) {
  const errorMsg = get(req, 'body.errorMessage', 'My first Sentry error!');

  try {
    throw new Error(errorMsg);
  } catch (e) {
    // Do nothing. This is what we wanted.
  }

  res.json({
    message: `Error sent to Sentry: "${errorMsg}"`,
  });
});

app.post('/debug-rollbar', function mainHandler(req, res) {
  const errorMsg = get(req, 'body.errorMessage', 'My first Rollbar error!');
  rollbar.error(errorMsg);

  res.json({
    message: `Error sent to Rollbar: "${errorMsg}"`,
  });
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
