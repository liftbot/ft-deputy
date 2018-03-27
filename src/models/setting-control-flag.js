'use strict';

const ftApi = require('../lib/ft-api');

function SettingControlFlag() {}

SettingControlFlag.initialize = function () {
  this.timer = setInterval(function () {
    SettingControlFlag.refresh();
  }, 120000);
  return this.refresh();
};

SettingControlFlag.destroy = function () {
  if (this.timer) {
    clearInterval(this.timer);
  }
  this.cache = null;
};

SettingControlFlag.refresh = function () {
  return ftApi.getFlags()
    .then(flags => {
      this.cache = flags;
      return flags;
    });
};

SettingControlFlag.findAll = function (options) {
  if (!options || Object.keys(options).length !== 1 || options.status !== 'active') {
    throw new Error('support for loading flags is now limited to { status: "active" }');
  }

  if (!this.cache) {
    throw new Error('SettingControlFlag now requires calling `initialize` first');
  }

  return this.cache;
};

SettingControlFlag.getStringValue = function (flagName) {
  if (!this.cache) {
    throw new Error('SettingControlFlag now requires calling `initialize` first');
  }

  const flag = this.cache.find(f => f.name === flagName);

  if (!flag) {
    return '';
  }

  if (typeof flag.value !== 'string') {
    // not a good idea to force converting to string but previous db based flag system save all flag values as strings
    return String(flag.value);
  }

  return flag.value;
};

SettingControlFlag.getBooleanValue = function (flagName) {
  if (!this.cache) {
    throw new Error('SettingControlFlag now requires calling `initialize` first');
  }

  const flag = this.cache.find(f => f.name === flagName);

  if (!flag) {
    return false;
  }

  if (typeof flag.value !== 'boolean') {
    // we should have correctly converted all boolean flags so it should be safe to throw error here
    throw new Error('"' + flagName + '" is not a boolean flag');
  }

  return flag.value;
};

module.exports = SettingControlFlag;
