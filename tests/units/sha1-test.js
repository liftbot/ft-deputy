'use strict';

const hash = require('../../src/lib/hash');

describe('sha1', () => {
  it('hash test', done => {
    expect(hash.sha1('Message')).to.equal('68f4145fee7dde76afceb910165924ad14cf0d00');
    done();
  });
});
