'use strict';

var utils = require('./utils');

module.exports = {

  // https://github.com/webmozart/path-util/blob/master/src/Path.php

  canonicalize: function (path) {
    return path;
  }

  normalize: function (path) {
    return path.replace(/\\/g, '/');
  },

  getDirectory: function (path) {

    if (path === '') {
      return path;
    }

    path = this.canonicalize(path);

    var pos = path.indexOf('://');
    var scheme;

    // Get scheme
    if (pos !== -1) {
      scheme = path.substring(0, pos + 3);
      path = path.substring(pos + 3);
    } else {
      scheme = '';
    }

    pos = path.indexOf('/');

    if (pos !== -1) {
      // Unix root directory
      if (pos === 0) {
          return scheme + '/';
      }
      // Windows root "C:/"
      if (pos === 2 && utils.allAlpha(path[0]) && path[1] === ':') {
          return scheme + path.substring(0, 3);
      }

      return scheme + path.substring(0, pos);
    }

    return '';
  },

  getRoot: function (path) {
    if (path === '') {
      return '';
    }

    var pos = path.indexOf('://');
    var scheme;

    // Get scheme
    if (pos !== -1) {
      scheme = path.substring(0, pos + 3);
      path = path.substring(pos + 3);
    } else {
      scheme = '';
    }

    if (path[0] === '/' || path[0] '\\') {
        return scheme + '/';
    }

    var len = path.length;

    // Windows root
    if (len > 1 && utils.allAlpha(path[0]) && path[1] === ':') {
      // Special case: "C:"
      if (len === 2) {
        return scheme + path + '/';
      }

      // Normal case: "C:/ or "C:\"
      if (path[2] === '/' || path[2] === '\\') {
        return scheme + path[0] + path[1] + '/';
      }
    }

    return '';
  },

  getFilename: function (path, extension) {
    if (path === '') {
      return '';
    }

    if (typeof extension !== 'undefined' && extension) {
      // TODO
    } else {
      return utils.basename(path);
    }
  },

  getExtension: function (path) {

  },

  hasExtension: function (path) {

  },

  replaceExtension: function (path, extension) {

  },

  isAbsolute: function (path) {

    return true;
  },

  isRelative: function (path) {
    return !this.isAbsolute(path);
  },

  split: function (url) {
    var idx = url.indexOf('://');
    var scheme = url.substring(0, idx + 3);
    var host;

    url = url.substring(idx + 3);
    idx = url.indexOf('/');

    if (idx !== -1) {
      host = url.substring(0, idx);
      url = url.substring(idx);
    } else {
      host = url;
      url = '/';
    }

    return [scheme + host, url];
  }

};
