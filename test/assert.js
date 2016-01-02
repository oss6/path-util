'use strict';

var assert = require('assert');
var mAssert = require('../lib/assert');

describe('assert', function () {

  describe('array', function () {

    var exceptionTests = [
      'hello',
      783,
      null,
      434.5,
      {},
      function () {}
    ];

    exceptionTests.forEach(function (input) {
      it('should throw an exception for non arrays', function () {
        assert.throws(function () {
          mAssert.array(input);
        });
      });
    });

  });

  describe('string', function () {

    var exceptionTests = [
      ['dfdf', 'hello'],
      783,
      null,
      434.5,
      undefined,
      {},
      function () {}
    ];

    exceptionTests.forEach(function (input) {
      it('should throw an exception for non strings', function () {
        assert.throws(function () {
          mAssert.string(input);
        });
      });
    });

  });

  describe('allString', function () {

    var exceptionTests = [
      ['dfdf', 34],
      ['hello', 'how', 'are', 'you', undefined],
      [94, null, undefined, false],
      783,
      null,
      434.5,
      undefined,
      {},
      function () {}
    ];

    exceptionTests.forEach(function (input) {
      it('should throw an exception for non array of strings', function () {
        assert.throws(function () {
          mAssert.allString(input);
        });
      });
    });

  });

});
