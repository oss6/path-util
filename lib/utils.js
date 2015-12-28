'use strict';

var u = module.exports;

u.scheme = function (path) {

};

// Reference: phpjs
u.basename = function (path, suffix) {
  var b = path;
  var lastChar = b.charAt(b.length - 1);

  if (lastChar === '/' || lastChar === '\\') {
    b = b.slice(0, -1);
  }

  b = b.replace(/^.*[\/\\]/g, '');

  if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
    b = b.substr(0, b.length - suffix.length);
  }

  return b;
};

u.allAlpha = function (str) {
  return str.match(/^([a-z])+$/i) !== null;
};
