'use strict';

var assert = require('assert');
var pathUtils = require('../lib/utils');

describe('utils', function () {

  describe('basename', function () {

    var tests = [
      {args: ['/node/site/style.css'],          expected: 'style.css'},
      {args: ['/node/site/style.css/'],         expected: 'style.css'},
      {args: ['/node/site/'],                   expected: 'site'},
      {args: ['/node/site'],                    expected: 'site'},
      {args: ['/'],                             expected: ''},
      {args: [''],                              expected: ''},
      {args: ['/node/site/style.css', '.css'],  expected: 'style'},
      {args: ['/node/site/style.css/', '.css'], expected: 'style'}
    ];

    tests.forEach(function (test) {
      it('correctly gets the trailing name component of ' + test.args[0], function () {
        var actual = pathUtils.basename.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  describe('allAlpha', function () {

    var tests = [
      {args: ['style.css'],   expected: false},
      {args: ['style1.css'],  expected: false},
      {args: [' style.css '], expected: false},
      {args: ['css'],         expected: true},
      {args: ['CDEF'],         expected: true}
    ];

    tests.forEach(function (test) {
      it('correctly checks if all characters are alphabetic: ' + test.args[0], function () {
        var actual = pathUtils.allAlpha.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  describe('trimLeft', function () {

    var tests = [
      {args: ['   /node/site/style.css'],     expected: '/node/site/style.css'},
      {args: ['hello'],                       expected: 'hello'},
      {args: ['hello  '],                     expected: 'hello  '},
      {args: ['__/node/site/style.css', '_'], expected: '/node/site/style.css'},
      {args: ['hello', '_'],                  expected: 'hello'},
      {args: ['hello__'],                     expected: 'hello__'}
    ];

    tests.forEach(function (test) {
      it('correctly removes leading characters of ' + test.args[0], function () {
        var actual = pathUtils.trimLeft.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  describe('trimRight', function () {

    var tests = [
      {args: ['/node/site/style.css   '],     expected: '/node/site/style.css'},
      {args: ['hello'],                       expected: 'hello'},
      {args: ['  hello'],                     expected: '  hello'},
      {args: ['/node/site/style.css__', '_'], expected: '/node/site/style.css'},
      {args: ['hello', '_'],                  expected: 'hello'},
      {args: ['__hello'],                     expected: '__hello'}
    ];

    tests.forEach(function (test) {
      it('correctly removes trailing characters of ' + test.args[0], function () {
        var actual = pathUtils.trimRight.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

});
