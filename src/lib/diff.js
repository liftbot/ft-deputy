'use strict';

const jsdiff = require('diff');
const fs = require('fs');

const mkdir = require('shelljs/shell').mkdir;
const rm = require('shelljs/shell').rm;
const cd = require('shelljs/shell').cd;
const exec = require('shelljs/shell').exec;
const tempdir = require('shelljs/shell').tempdir;

module.exports = {
  createPatch(filename, oldStr, newStr) {
    let patch = jsdiff.createPatch(filename, oldStr, newStr);
    let reversePatch = jsdiff.createPatch(filename, newStr, oldStr);
    return {patch: patch, reverse_patch: reversePatch};
  },

  /*
    baseContent: it's old content
    patch: generate from old to new content
  */
  applyPatch(baseContent, patch) {
    return jsdiff.applyPatch(baseContent, jsdiff.parsePatch(patch));
  },

  merge(latestContent, baseContent, modifiedContent) {
    let folder = `${(new Date()).getTime()}`;
    folder = `${tempdir()}/${folder}`;

    mkdir('-p', folder);

    fs.writeFileSync(`${folder}/latest`, latestContent);
    fs.writeFileSync(`${folder}/original`, baseContent);
    fs.writeFileSync(`${folder}/modified`, modifiedContent);

    cd(folder);

    let result = exec("diff3 -m latest original modified", { silent: true });

    cd('~');
    rm('-rf', folder);

    return { text: result.stdout, error: result.stderr, exitStatus: result.code };
  },

  run(content, newContent, sep=' ') {
    let folder = `${(new Date()).getTime()}`;
    folder = `${tempdir()}/${folder}`;

    mkdir('-p', folder);

    fs.writeFileSync(`${folder}/content`, content);
    fs.writeFileSync(`${folder}/newContent`, newContent);

    cd(folder);

    let cmd = `diff --unchanged-line-format='%dn${sep}%L --new-line-format='+${sep}%dn${sep}%L'
      --old-line-format='-${sep}%dn${sep}%L' content newContent`;

    let result = exec(cmd, { silent: true });

    cd('~');
    rm('-rf', folder);

    return result;
  }
};
