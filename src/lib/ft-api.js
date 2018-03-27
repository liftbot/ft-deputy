'use strict';

const request = require('request-promise');

module.exports = {
  getFlags() {
    // this library is deprecated and is only used by Tank now
    return this.get('/flags?hasTag=Tank');
  },
  get(url) {
    const options = {
      url: getFullUrl(url),
      headers: {
        'API-Domain': 'true',
        'Authorization': getApiToken()
      },
      json: true
    };
    return request.get(options);
  }
};

function getFullUrl(url) {
  if (!url.startsWith('/')) {
    throw new Error('url must starts with "/"');
  }
  return getUrlPrefix() + url;
}

function getUrlPrefix() {
  const env = process.env.NODE_ENV || 'development';

  let prefix = process.env.FT_API_HOST;

  switch (env) {
    case 'development':
      if (!prefix) {
        prefix = 'http://localhost:3000';
      } else if (!prefix.startsWith('http://')) {
        throw new Error('FT_API_HOST for dev must starts with "http://"');
      }
      break;
    case 'staging':
      if (!prefix) {
        prefix = 'https://apistag.fulfillment.tools';
      } else if (!prefix.startsWith('https://')) {
        throw new Error('FT_API_HOST for staging must starts with "https://"');
      }
      break;
    case 'production':
      if (!prefix) {
        prefix = 'https://api.fulfillment.tools';
      } else if (!prefix.startsWith('https://')) {
        throw new Error('FT_API_HOST for production must starts with "https://"');
      }
      break;
    default:
      throw new Error(`unknown env "${env}"`);
  }

  return prefix;
}

function getApiToken() {
  if (process.env.FT_API_TOKEN) {
    return process.env.FT_API_TOKEN;
  }

  const env = process.env.NODE_ENV || 'development';

  if (env === 'development') {
    return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoic3VwZXJfdXNlckBmdWxmaWxsbWVudC50b29scyIsImV4cCI6NDEwMjQ0NDc5OTk5OX0.MwhMrX_g5yP1u-LH8nt1HBTqj7BviV1B0dWq5GVmEE4';
  } else {
    throw new Error('environment variable FT_API_TOKEN is not set');
  }
}
