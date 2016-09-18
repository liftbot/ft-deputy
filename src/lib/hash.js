'use strict';

const SHA1 = require("crypto/sha1");
const prettify = require('./prettify');

module.exports = {
  sha1(content) {
    return SHA1.hex_sha1(content);
  },

  prettifySha1(content, fileType) {
    content = prettify(content, fileType);
    return SHA1.hex_sha1(content);
  }
};
