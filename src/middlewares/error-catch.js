'use strict';

const request = require('request');

let jobService = process.env.JOB_SERVICE || 'http://localhost:7000';

module.exports = (emailSubject) => {
  return (err, req, res, next) => {
    logger.error(err.message, "\n" + err.stack);

    if (!(err instanceof FTError) && jobService) {  // Uncatched error should be notified
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
            subject: emailSubject,
            requestPath: req.path,
            requestMethod: req.method,
            errorMessage: err.message,
            errorTrace: err.stack,
            requestBody: req.body
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
    res.json(err.customData || {error: err.message});
  }
};
