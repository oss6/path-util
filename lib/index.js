'use strict';

// https://github.com/webmozart/path-util/blob/master/src/Path.php

var pathUtils = require('./utils');
var x = module.exports;

x.canonicalize = function (path) {
  return x.normalize(path);
};

x.normalize = function (path) {
  return path.replace(/\\/g, '/');
};

x.getDirectory = function (path) {

  if (path === '') {
    return path;
  }

  path = x.canonicalize(path);

  var pos = path.indexOf('://');
  var scheme;

  // Get scheme
  if (pos !== -1) {
    scheme = path.substring(0, pos + 3);
    path = path.substring(pos + 3);
  } else {
    scheme = '';
  }

  pos = path.lastIndexOf('/');

  if (pos !== -1) {
    // Unix root directory
    if (pos === 0) {
      return scheme + '/';
    }
    // Windows root "C:/"
    if (pos === 2 && pathUtils.allAlpha(path[0]) && path[1] === ':') {
      return scheme + path.substring(0, 3);
    }

    return scheme + path.substring(0, pos);
  }

  return '';
};

x.getRoot = function (path) {
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

  if (path[0] === '/' || path[0] === '\\') {
    return scheme + '/';
  }

  var len = path.length;

  // Windows root
  if (len > 1 && pathUtils.allAlpha(path[0]) && path[1] === ':') {
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
};

x.getFilename = function (path, extension) {
  if (path === '') {
    return '';
  }

  if (typeof extension !== 'undefined' && extension) {
    // TODO
  } else {
    return pathUtils.basename(path);
  }
};

x.getExtension = function (path) {
  if (path === '') {
    return '';
  }

  var pos = path.lastIndexOf('.');
  return pos !== -1 ? path.substring(pos + 1) : '';
};

x.hasExtension = function (path, extensions) {
  if (path === '') {
    return false;
  }

  var exts = typeof extensions === 'undefined' ? [] : (!Array.isArray(extensions) ? [extensions] : extensions);
  var actualExt = x.getExtension(path);

  if (exts.length === 0) {
    return actualExt !== '';
  }

  exts = exts.map(function (ext) {
    return pathUtils.trimLeft(ext, '.');
  });

  return exts.indexOf(actualExt) !== -1;
};

x.replaceExtension = function (path, extension) {
  if (path === '') {
    return '';
  }

  var actualExt = x.getExtension(path);
  extension = pathUtils.trimLeft(extension, '.');

  // No extension for paths
  if (path.slice(-1) === '/') {
    return path;
  }

  // No actual extension in path
  if (actualExt === '') {
    return path + (path.slice(-1) === '.' ? '' : '.') + extension;
  }

  return path.slice(0, -actualExt.length) + extension;
};

x.isAbsolute = function (path) {

};

x.isRelative = function (path) {

};

x.split = function (path) {

};
