'use strict';

let vkbeautify = require('./vkbeautify');

module.exports = (content, type, indent) => {
  indent = (indent || 4);
  switch (type) {
    case 'xml':
      return vkbeautify.xml(content, indent);
    case 'json':
      return vkbeautify.json(content, indent);
    default:
      return content;
  }
};
