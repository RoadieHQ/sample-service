const express = require('express');
const Sentry = require('@sentry/node');
const Rollbar = require('rollbar');

const app = express();

Sentry.init({ dsn: process.env.SENTRY_INGESTION_URL });

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

app.get('/debug-sentry', function mainHandler(req, res) {
  try {
    throw new Error('My first Sentry error!');
  } catch (e) {
    // Do nothing. We wanted an error.
  }

  res.json({
    message: 'Error sent to Sentry',
  });
});

app.get('/debug-rollbar', function mainHandler(req, res) {
  rollbar.error('This is a test Rollbar error');

  res.json({
    message: 'Error sent to Rollbar',
  });
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res) {
  // The error id is attached to `res.sentry` to be returned and optionally displayed to the
  // user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
