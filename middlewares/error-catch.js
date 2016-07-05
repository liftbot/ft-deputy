'use strict';

const FTError = require('../lib/errors').FTError;
const request = require('request');

module.exports = (appName, logger, jobService) => {
  return (err, req, res, next) => {
    logger.error(err.message, "\n" + err.stack);

    if (!(err instanceof FTError)) {  // Uncatched error should be notified
      let options = {
        method: 'POST',
        uri: jobService + '/jobs/mail',
        headers: {
          'X-FT-USER': req.get('X-FT-USER'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: "Exception",
          params: {
            subject: appName,
            requestPath: req.path,
            requestMethod: req.method,
            errorMessage: err.message,
            errorTrace: err.stack
          }
        })
      };
      request(options, (error, httpResponse, body) => {
        if (error) {
          logger.error(`Send exception mail failed: ${error.message}`);
        } else {
          logger.info(`Send exception mail completed: ${httpResponse.statusCode}: ${body}`);
        }
      });
    }

    res.status(err.code || 500);
    res.json({error: err.message});
  }
};
