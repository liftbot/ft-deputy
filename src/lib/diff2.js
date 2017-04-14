'use strict';

const fs = require('fs');
const shortid = require('shortid');

const mkdir = require('shelljs/shell').mkdir;
const rm = require('shelljs/shell').rm;
const cd = require('shelljs/shell').cd;
const exec = require('shelljs/shell').exec;
const tempdir = require('shelljs/shell').tempdir;

let Errors = {};
require('./errors')(Errors);

const FTError = Errors.FTError;

module.exports = {
  createPatch(filename, oldStr, newStr) {
    if (arguments.length === 2) {
      oldStr = arguments[0];
      newStr = arguments[1];
    } else if (arguments.length === 3) {
      oldStr = arguments[1];
      newStr = arguments[2];
    } else {
      throw new FTError('You should use this way "createPatch(oldStr, newStr)"');
    }

    let folder = tempAssets(oldStr, newStr);
    let patch = createPatch(folder);
    let reversePatch = createPatch(folder, true);
    rmTempAssets(folder);

    return patch === false ? false : { patch: patch, reverse_patch: reversePatch };
  },

  /*
    baseContent: oldStr / newStr
    patch: patch / reverse_patch
  */
  applyPatch(content, patch) {
    let folder = tempAssets(content, patch);
    let result = applyPatch(folder);
    rmTempAssets(folder);
    return result;
  },

  merge(latestContent, baseContent, modifiedContent) {
    let folder = tempAssets(latestContent, baseContent, modifiedContent);
    let result = exec(`diff3 -m ${folder}/1 ${folder}/2 ${folder}/3`, { silent: true });
    rmTempAssets(folder);
    return { text: result.stdout, error: result.stderr, exitStatus: result.code };
  },

  run(content, newContent, sep) {
    sep = sep || ' ';
    let folder = tempAssets(content, newContent);
    let cmd = `diff --unchanged-line-format='%dn${sep}%L' --new-line-format='+${sep}%dn${sep}%L' ` +
      `--old-line-format='-${sep}%dn${sep}%L' ${folder}/1 ${folder}/2`;

    let result = exec(cmd, { silent: true });
    rmTempAssets(folder);
    return result;
  }
};

let tempAssets = (...files) => {
  let folder = `${tempdir()}/${shortid.generate()}`;
  mkdir('-p', folder);

  files.forEach((file, index) => fs.writeFileSync(`${folder}/${index + 1}`, file));
  // prepared an empty file for revert
  fs.writeFileSync(`${folder}/0`, '');

  return folder;
};

let rmTempAssets = (folder) => {
  exec(`rm -rf ${folder}`);
};

let createPatch = (folder, reverse) => {
  let result = reverse ? exec(`diff -U 0 ${folder}/2 ${folder}/1`, { silent: true }) :
    exec(`diff -U 0 ${folder}/1 ${folder}/2`, { silent: true });

  // An exit status of 0 means no differences were found, 1 means some differences were found, and 2 means trouble.
  switch (result.code) {
    case 0:
      return false;
    case 1:
      return result.stdout;
    default:
      // rmTempAssets(folder);
      throw new FTError(result.stderr || result.stdout);
  }
};

let applyPatch = (folder) => {
  let result = exec(`patch -o ${folder}/0 ${folder}/1 < ${folder}/2`, { silent: true });
  if (result.code > 0) {
    rmTempAssets(folder);
    throw new FTError(result.stderr || result.stdout);
  }
  return fs.readFileSync(`${folder}/0`).toString();
};
