'use strict';

const diff = require('../../src/lib/diff');

describe('diff', () => {
  it('merge without conflict', done => {
    let latestContent = `
      1234
      1111
      6666
    `;
    let baseContent = `
      4444
      1111
      6666
    `;
    let modifiedContent = `
      4444
      1111
      7890
    `;
    let result = diff.merge(latestContent, baseContent, modifiedContent);
    expect(result.exitStatus).to.equal(0);
    done();
  });

  it('merge with conflict', done => {
    let latestContent = `
      4444
      5555
      6666
    `;
    let baseContent = `
      4444
      1111
      6666
    `;
    let modifiedContent = `
      4444
      1111
      7890
    `;
    let result = diff.merge(latestContent, baseContent, modifiedContent);
    expect(result.exitStatus).to.equal(1);
    done();
  });
});
