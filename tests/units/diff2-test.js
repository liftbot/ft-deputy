'use strict';

const diff = require('../../src/lib/diff2');

describe('diff2', () => {
  let oldStr, newStr, p, rp;

  before(done => {
    oldStr = `
      1234
      1111
      6666
    `;
    newStr = `
      4444
      1111
      6666
    `;
    p = `@@ -2 +2 @@
-      1234
+      4444
`;
    rp = `@@ -2 +2 @@
-      4444
+      1234
`;
    done();
  });

  describe('createPatch', () => {
    it('has differences', done => {
      let { patch, reverse_patch } = diff.createPatch(oldStr, newStr);
      expect(patch).to.have.string(p);
      expect(reverse_patch).to.have.string(rp);
      done();
    });

    it('has no differences', done => {
      let newStr1 = oldStr.toString();
      let r = diff.createPatch(oldStr, newStr1);
      expect(r).to.be.false;
      done();
    });

    it('has errors by no arguments', done => {
      expect(diff.createPatch).to.throw(/You should use this way/);
      done();
    });

    it('has errors by diff run failed', done => {
      // diff command always run successfully............
      done();
    });
  });

  describe('applyPatch', () => {
    it('revert old file to new file by patch', done => {
      expect(newStr).to.equal(diff.applyPatch(oldStr, p));
      done();
    });

    it('revert new file to old file by reverse patch', done => {
      expect(oldStr).to.equal(diff.applyPatch(newStr, rp));
      done();
    });

    it('revert with errors', done => {
      let patch = 'asd' + p;
      expect(() => diff.applyPatch(newStr, patch)).to.throw(Error);
      done();
    });
  });

  describe('merge', () => {
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
});
