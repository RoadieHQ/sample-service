const express = require('express');
const Sentry = require('@sentry/node');

const app = express();

Sentry.init({ dsn: 'https://7018c42dfe4641d38b3880b76e7ad0df@o416326.ingest.sentry.io/5346543' });

app.use(Sentry.Handlers.requestHandler());

// All controllers should live here
app.get('/', function rootHandler(req, res) {
  res.end('Hello world!');
});

app.get('/debug-sentry', function mainHandler() {
  throw new Error('My first Sentry error!');
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

app.listen(3000);
