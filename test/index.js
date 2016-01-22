'use strict';

var assert = require('assert');
var path = require('../lib');

describe('path-util', function () {

  //////////////////
  // CANONICALIZE //
  //////////////////

  describe('canonicalize', function () {

    var tests = [
      {args: [''], expected: ''},
      {args: ['css/./style.css'], expected: 'css/style.css'},
      {args: ['css/../style.css'], expected: 'style.css'},
      {args: ['css\\.\\style.css'], expected: 'css/style.css'},
      {args: ['css\\..\\style.css'], expected: 'style.css'},
      {args: ['/css/style.css'], expected: '/css/style.css'},
      {args: ['/css/./style.css'], expected: '/css/style.css'},
      {args: ['/css/../style.css'], expected: '/style.css'},
      {args: ['\\css\\style.css'], expected: '/css/style.css'},
      {args: ['\\css\\..\\style.css'], expected: '/style.css'},
      {args: ['C:/css/style.css'], expected: 'C:/css/style.css'},
      {args: ['C:/css/../style.css'], expected: 'C:/style.css'},
      {args: ['C:\\css\\style.css'], expected: 'C:/css/style.css'},
      {args: ['C:\\css\\..\\style.css'], expected: 'C:/style.css'},
      {args: ['C:'], expected: 'C:/'},
      {args: ['C:css/style.css'], expected: 'C:css/style.css'},
      {args: ['file:///css/style.css'], expected: 'file:///css/style.css'},
      {args: ['file:///css/../style.css'], expected: 'file:///style.css'},
      {args: ['file://C:/css/style.css'], expected: 'file://C:/css/style.css'},
      {args: ['file://C:/css/../style.css'], expected: 'file://C:/style.css'}
    ];

    tests.forEach(function (test) {
      it('correctly canonicalize the given path: ' + test.args[0], function () {
        var actual = path.canonicalize.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  /////////////////
  // COMMON PATH //
  /////////////////

  describe('commonPath', function () {

    var tests = [
      // same paths
      {args: [['/base/path', '/base/path']], expected: '/base/path'},
      {args: [['C:/base/path', 'C:/base/path']], expected: 'C:/base/path'},
      {args: [['C:\\base\\path', 'C:\\base\\path']], expected: 'C:/base/path'},
      {args: [['C:/base/path', 'C:\\base\\path']], expected: 'C:/base/path'},
      {args: [['phar:///base/path', 'phar:///base/path']], expected: 'phar:///base/path'},
      {args: [['phar://C:/base/path', 'phar://C:/base/path']], expected: 'phar://C:/base/path'},
      // trailing slash
      {args: [['/base/path/', '/base/path']], expected: '/base/path'},
      {args: [['C:/base/path/', 'C:/base/path']], expected: 'C:/base/path'},
      {args: [['C:\\base\\path\\', 'C:\\base\\path']], expected: 'C:/base/path'},
      {args: [['C:/base/path/', 'C:\\base\\path']], expected: 'C:/base/path'},
      {args: [['phar:///base/path/', 'phar:///base/path']], expected: 'phar:///base/path'},
      {args: [['phar://C:/base/path/', 'phar://C:/base/path']], expected: 'phar://C:/base/path'},
      {args: [['/base/path', '/base/path/']], expected: '/base/path'},
      {args: [['C:/base/path', 'C:/base/path/']], expected: 'C:/base/path'},
      {args: [['C:\\base\\path', 'C:\\base\\path\\']], expected: 'C:/base/path'},
      {args: [['C:/base/path', 'C:\\base\\path\\']], expected: 'C:/base/path'},
      {args: [['phar:///base/path', 'phar:///base/path/']], expected: 'phar:///base/path'},
      {args: [['phar://C:/base/path', 'phar://C:/base/path/']], expected: 'phar://C:/base/path'},
      // first in second
      {args: [['/base/path/sub', '/base/path']], expected: '/base/path'},
      {args: [['C:/base/path/sub', 'C:/base/path']], expected: 'C:/base/path'},
      {args: [['C:\\base\\path\\sub', 'C:\\base\\path']], expected: 'C:/base/path'},
      {args: [['C:/base/path/sub', 'C:\\base\\path']], expected: 'C:/base/path'},
      {args: [['phar:///base/path/sub', 'phar:///base/path']], expected: 'phar:///base/path'},
      {args: [['phar://C:/base/path/sub', 'phar://C:/base/path']], expected: 'phar://C:/base/path'},
      // second in first
      {args: [['/base/path', '/base/path/sub']], expected: '/base/path'},
      {args: [['C:/base/path', 'C:/base/path/sub']], expected: 'C:/base/path'},
      {args: [['C:\\base\\path', 'C:\\base\\path\\sub']], expected: 'C:/base/path'},
      {args: [['C:/base/path', 'C:\\base\\path\\sub']], expected: 'C:/base/path'},
      {args: [['phar:///base/path', 'phar:///base/path/sub']], expected: 'phar:///base/path'},
      {args: [['phar://C:/base/path', 'phar://C:/base/path/sub']], expected: 'phar://C:/base/path'},
      // first is prefix
      {args: [['/base/path/di', '/base/path/dir']], expected: '/base/path'},
      {args: [['C:/base/path/di', 'C:/base/path/dir']], expected: 'C:/base/path'},
      {args: [['C:\\base\\path\\di', 'C:\\base\\path\\dir']], expected: 'C:/base/path'},
      {args: [['C:/base/path/di', 'C:\\base\\path\\dir']], expected: 'C:/base/path'},
      {args: [['phar:///base/path/di', 'phar:///base/path/dir']], expected: 'phar:///base/path'},
      {args: [['phar://C:/base/path/di', 'phar://C:/base/path/dir']], expected: 'phar://C:/base/path'},
      // second is prefix
      {args: [['/base/path/dir', '/base/path/di']], expected: '/base/path'},
      {args: [['C:/base/path/dir', 'C:/base/path/di']], expected: 'C:/base/path'},
      {args: [['C:\\base\\path\\dir', 'C:\\base\\path\\di']], expected: 'C:/base/path'},
      {args: [['C:/base/path/dir', 'C:\\base\\path\\di']], expected: 'C:/base/path'},
      {args: [['phar:///base/path/dir', 'phar:///base/path/di']], expected: 'phar:///base/path'},
      {args: [['phar://C:/base/path/dir', 'phar://C:/base/path/di']], expected: 'phar://C:/base/path'},
      // root is common base path
      {args: [['/first', '/second']], expected: '/'},
      {args: [['C:/first', 'C:/second']], expected: 'C:/'},
      {args: [['C:\\first', 'C:\\second']], expected: 'C:/'},
      {args: [['C:/first', 'C:\\second']], expected: 'C:/'},
      {args: [['phar:///first', 'phar:///second']], expected: 'phar:///'},
      {args: [['phar://C:/first', 'phar://C:/second']], expected: 'phar://C:/'},
      // windows vs unix
      {args: [['/base/path', 'C:/base/path']], expected: ''},
      {args: [['C:/base/path', '/base/path']], expected: ''},
      {args: [['/base/path', 'C:\\base\\path']], expected: ''},
      {args: [['phar:///base/path', 'phar://C:/base/path']], expected: ''},
      // different partitions
      {args: [['C:/base/path', 'D:/base/path']], expected: ''},
      {args: [['C:/base/path', 'D:\\base\\path']], expected: ''},
      {args: [['C:\\base\\path', 'D:\\base\\path']], expected: ''},
      {args: [['phar://C:/base/path', 'phar://D:/base/path']], expected: ''},
      // three paths
      {args: [['/base/path/foo', '/base/path', '/base/path/bar']], expected: '/base/path'},
      {args: [['C:/base/path/foo', 'C:/base/path', 'C:/base/path/bar']], expected: 'C:/base/path'},
      {args: [['C:\\base\\path\\foo', 'C:\\base\\path', 'C:\\base\\path\\bar']], expected: 'C:/base/path'},
      {args: [['C:/base/path//foo', 'C:/base/path', 'C:\\base\\path\\bar']], expected: 'C:/base/path'},
      {args: [['phar:///base/path/foo', 'phar:///base/path', 'phar:///base/path/bar']], expected: 'phar:///base/path'},
      {args: [['phar://C:/base/path/foo', 'phar://C:/base/path', 'phar://C:/base/path/bar']], expected: 'phar://C:/base/path'},
      // three paths with root
      {args: [['/base/path/foo', '/', '/base/path/bar']], expected: '/'},
      {args: [['C:/base/path/foo', 'C:/', 'C:/base/path/bar']], expected: 'C:/'},
      {args: [['C:\\base\\path\\foo', 'C:\\', 'C:\\base\\path\\bar']], expected: 'C:/'},
      {args: [['C:/base/path//foo', 'C:/', 'C:\\base\\path\\bar']], expected: 'C:/'},
      {args: [['phar:///base/path/foo', 'phar:///', 'phar:///base/path/bar']], expected: 'phar:///'},
      {args: [['phar://C:/base/path/foo', 'phar://C:/', 'phar://C:/base/path/bar']], expected: 'phar://C:/'},
      // three paths, different roots
      {args: [['/base/path/foo', 'C:/base/path', '/base/path/bar']], expected: ''},
      {args: [['/base/path/foo', 'C:\\base\\path', '/base/path/bar']], expected: ''},
      {args: [['C:/base/path/foo', 'D:/base/path', 'C:/base/path/bar']], expected: ''},
      {args: [['C:\\base\\path\\foo', 'D:\\base\\path', 'C:\\base\\path\\bar']], expected: ''},
      {args: [['C:/base/path//foo', 'D:/base/path', 'C:\\base\\path\\bar']], expected: ''},
      {args: [['phar:///base/path/foo', 'phar://C:/base/path', 'phar:///base/path/bar']], expected: ''},
      {args: [['phar://C:/base/path/foo', 'phar://D:/base/path', 'phar://C:/base/path/bar']], expected: ''},
      // only one path
      {args: [['/base/path']], expected: '/base/path'},
      {args: [['C:/base/path']], expected: 'C:/base/path'},
      {args: [['C:\\base\\path']], expected: 'C:/base/path'},
      {args: [['phar:///base/path']], expected: 'phar:///base/path'},
      {args: [['phar://C:/base/path']], expected: 'phar://C:/base/path'}
    ];

    tests.forEach(function (test) {
      it('correctly finds the common path: ' + test.args[0], function () {
        var actual = path.commonPath.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  /////////////////////////////
  // ENSURE DIRECTORY ENDING //
  /////////////////////////////

  describe('ensureDirectoryEnding', function () {

    var tests = [
      {args: ['/js/main.js'],           expected: '/js/main.js/'},
      {args: ['\\js'],                  expected: '/js/'},
      {args: ['\\'],                    expected: '/'},
      {args: ['/'],                     expected: '/'},
      {args: [''],                      expected: '/'},
      {args: ['C:/js/'],                expected: 'C:/js/'},
      {args: ['C:/js/hello'],           expected: 'C:/js/hello/'},
      {args: ['file:///css'],           expected: 'file:///css/'}
    ];

    tests.forEach(function (test) {
      it('correctly ensures that a path has a directory ending: ' + test.args[0], function () {
        var actual = path.ensureDirectoryEnding.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  ///////////////////
  // COMMON PREFIX //
  ///////////////////

  describe('commonPrefix', function () {

    var tests = [
      {args: [['interspecies', 'interstellar', 'interstate']], expected: 'inters'},
      {args: [['throne', 'throne']], expected: 'throne'},
      {args: [['throne', 'dungeon']], expected: ''},
      {args: [['cheese']], expected: 'cheese'},
      {args: [['foo', 'foobar']], expected: 'foo'}
    ];

    tests.forEach(function (test) {
      it('correctly finds the common prefix: ' + test.args[0], function () {
        var actual = path.commonPrefix.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  //////////////
  // FROM URI //
  //////////////

  describe('fromUri', function () {

    var tests = [
      {args: ['/node/site/style.css'],        expected: '/node/site/style.css'},
      {args: ['/node/site'],                  expected: '/node/site'},
      {args: ['/'],                           expected: '/'},
      {args: ['\\'],                          expected: '/'},
      {args: [''],                            expected: ''},
      {args: ['file:///node/site'],           expected: '/node/site'},
      {args: ['file://C:/node/site'],         expected: 'C:/node/site'},
      {args: ['file://C:\\node\\site'],       expected: 'C:/node/site'}
    ];

    tests.forEach(function (test) {
      it('correctly gets the path from URI: ' + test.args[0], function () {
        var actual = path.fromUri.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  ///////////////////
  // GET DIRECTORY //
  ///////////////////

  describe('getDirectory', function () {

    var tests = [
      {args: ['/node/site/style.css'],        expected: '/node/site'},
      {args: ['/node/site'],                  expected: '/node'},
      {args: ['/node'],                       expected: '/'},
      {args: ['/'],                           expected: '/'},
      {args: [''],                            expected: ''},
      {args: ['\\node\\site\\style.css'],     expected: '/node/site'},
      {args: ['\\node\\site'],                expected: '/node'},
      {args: ['\\node'],                      expected: '/'},
      {args: ['\\'],                          expected: '/'},
      {args: ['file:///node/site/style.css'], expected: 'file:///node/site'},
      {args: ['file:///node/site'],           expected: 'file:///node'},
      {args: ['file:///node'],                expected: 'file:///'},
      {args: ['file:///'],                    expected: 'file:///'},
      {args: ['C:node'],                      expected: ''},
      {args: ['C:\\node\\site\\style.css'],   expected: 'C:/node/site'},
      {args: ['C:\\node\\site'],   expected: 'C:/node'},
      {args: ['C:\\node'],   expected: 'C:/'},
      {args: ['C:\\'],   expected: 'C:/'}
    ];

    tests.forEach(function (test) {
      it('correctly gets the directory of ' + test.args[0], function () {
        var actual = path.getDirectory.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  ///////////////////
  // GET EXTENSION //
  ///////////////////

  describe('getExtension', function () {

    var tests = [
      {args: ['/node/site/style.css.test'], expected: 'test'},
      {args: ['/node/site/style.css'],      expected: 'css'},
      {args: ['/node/site/style.css.'],     expected: ''},
      {args: ['/node/site/'],               expected: ''},
      {args: ['/node/site'],                expected: ''},
      {args: ['/'],                         expected: ''},
      {args: [''],                          expected: ''}
    ];

    tests.forEach(function (test) {
      it('correctly gets the extension of ' + test.args[0], function () {
        var actual = path.getExtension.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  //////////////////
  // GET FILENAME //
  //////////////////

  describe('getFilename', function () {

    var testsExt = [
      {args: ['/node/site/style.css'],  expected: 'style.css'},
      {args: ['/node/site/style.css/'], expected: 'style.css'},
      {args: ['/node/site/'],           expected: 'site'},
      {args: ['/node/site'],            expected: 'site'},
      {args: ['/'],                     expected: ''},
      {args: [''],                      expected: ''}
    ];

    testsExt.forEach(function (test) {
      it('correctly gets the filename with extension of ' + test.args[0], function () {
        var actual = path.getFilename.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  //////////////
  // GET ROOT //
  //////////////

  describe('getRoot', function () {

    var tests = [
      {args: ['/js/main.js'],           expected: '/'},
      {args: ['/'],                     expected: '/'},
      {args: ['js/main.js'],            expected: ''},
      {args: [''],                      expected: ''},
      {args: ['\\js\\main.js'],         expected: '/'},
      {args: ['\\'],                    expected: '/'},
      {args: ['js\\main.js'],           expected: ''},
      {args: ['C:/js/main.js'],         expected: 'C:/'},
      {args: ['C:/'],                   expected: 'C:/'},
      {args: ['C:'],                    expected: 'C:/'},
      {args: ['F:\\js\\main.js'],       expected: 'F:/'},
      {args: ['F:\\'],                  expected: 'F:/'},
      {args: ['file:///css/style.css'], expected: 'file:///'},
      {args: ['file:///'],              expected: 'file:///'}
    ];

    tests.forEach(function (test) {
      it('correctly gets the root of ' + test.args[0], function () {
        var actual = path.getRoot.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  /////////////////
  // GET SEGMENT //
  /////////////////

  describe('getSegment', function () {

    var tests = [
      {args: ['/js/main.js', 0],           expected: ''},
      {args: ['js/main.js', 0],            expected: 'js'},
      {args: ['\\js\\main.js', 1],         expected: 'js'},
      {args: ['\\', 0],                    expected: ''},
      {args: ['js\\main.js', 0],           expected: 'js'},
      {args: ['C:/js/main.js', 0],         expected: 'C:'},
      {args: ['C:/js/hello/main.js', 2],   expected: 'hello'},
      {args: ['file:///css/style.css', 1], expected: 'css'},
      {args: ['file:///', 0],              expected: ''}
    ];

    var outOfBoundsTests = [
      {args: ['/js/main.js', -1]},
      {args: ['js/main.js', 2]},
      {args: ['\\js\\', 3]}
    ];

    tests.forEach(function (test) {
      it('correctly gets the segment of ' + test.args[0] + ' using index: ' + test.args[1], function () {
        var actual = path.getSegment.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

    it('should throw an exception for empty strings', function () {
      assert.throws(function () {
        path.getSegment('', 4);
      });
    });

    outOfBoundsTests.forEach(function (test) {
      it('should throw an exception for out of bounds indices', function () {
        assert.throws(function () {
          path.getSegment.apply(null, test.args);
        });
      });
    });

  });

  ///////////////////////
  // GET SEGMENT COUNT //
  ///////////////////////

  describe('getSegmentCount', function () {

    var tests = [
      {args: ['/js/main.js'],           expected: 3},
      {args: ['js/main.js'],            expected: 2},
      {args: ['\\js\\main.js'],         expected: 3},
      {args: ['\\'],                    expected: 0},
      {args: ['js\\main.js'],           expected: 2},
      {args: ['C:/js/main.js'],         expected: 3},
      {args: ['C:/js/hello/main.js'],      expected: 4},
      {args: ['file:///css/style.css'], expected: 3},
      {args: ['file:///'],              expected: 0}
    ];

    tests.forEach(function (test) {
      it('correctly gets the segment count of ' + test.args[0], function () {
        var actual = path.getSegmentCount.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

    it('should throw an exception for empty strings', function () {
      assert.throws(function () {
        path.getSegmentCount('');
      });
    });

  });

  //////////////////////////
  // HAS DIRECTORY ENDING //
  //////////////////////////

  describe('hasDirectoryEnding', function () {

    var tests = [
      {args: ['/js/main.js'],           expected: false},
      {args: ['js/main.js'],            expected: false},
      {args: ['\\js\\main.js'],         expected: false},
      {args: ['\\'],                    expected: true},
      {args: ['/'],                     expected: true},
      {args: [''],                      expected: false},
      {args: ['js\\main.js\\'],         expected: true},
      {args: ['C:/js/main.js'],         expected: false},
      {args: ['C:/js/hello/main.js/'],  expected: true},
      {args: ['file:///css/style.css'], expected: false},
      {args: ['file:///css/'],          expected: true}
    ];

    tests.forEach(function (test) {
      it('correctly detect if a path has a directory ending: ' + test.args[0], function () {
        var actual = path.hasDirectoryEnding.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  ///////////////////
  // HAS EXTENSION //
  ///////////////////

  describe('hasExtension', function () {

    var tests = [
      {args: ['/node/site/style.css.test'], expected: true},
      {args: ['/node/site/style.css'],      expected: true},
      {args: ['/node/site/style.css.'],     expected: false},
      {args: ['/node/site/'],               expected: false},
      {args: ['/node/site'],                expected: false},
      {args: ['/'],                         expected: false},
      {args: [''],                          expected: false},
      {args: ['/node/site/style.css.test', 'test'], expected: true},
      {args: ['/node/site/style.css.test', 'css'],      expected: false},
      {args: ['/node/site/style.css', 'css'],     expected: true},
      {args: ['/node/site/style.css', '.css'],               expected: true},
      {args: ['/node/site/style.css.', ''],                expected: true},
      {args: ['/node/site/', 'ext'],                         expected: false},
      {args: ['/node/site', 'ext'],                          expected: false},
      {args: ['/', 'ext'],                          expected: false},
      {args: ['', 'ext'],                          expected: false}
    ];

    tests.forEach(function (test) {
      it('correctly checks the extension of ' + test.args[0] + ' with extension(s): ' + (typeof test.args[1] === 'undefined' ? 'none' : test.args[1]), function () {
        var actual = path.hasExtension.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  /////////////////
  // IS ABSOLUTE //
  /////////////////

  describe('isAbsolute', function () {

    var tests = [
      {args: ['/node/site/style.css'],    expected: true},
      {args: ['/'],                       expected: true},
      {args: ['node/site/style.css'],     expected: false},
      {args: [''],                        expected: false},
      {args: ['\\node\\site\\style.css'], expected: true},
      {args: ['\\'],                      expected: true},
      {args: ['node\\site\\style.css'],   expected: false},
      {args: ['C:/css/style.css'],        expected: true},
      {args: ['D:/'],                     expected: true},
      {args: ['E:\\css\\style.css'],      expected: true},
      {args: ['F:\\'],                    expected: true},
      {args: ['file:///css/style.css'],   expected: true},
      {args: ['file:///'],                expected: true},
      {args: ['C:'],                      expected: true},
      {args: ['C:css/style.css'],         expected: false}
    ];

    tests.forEach(function (test) {
      it('correctly checks if the given path is absolute: ' + test.args[0], function () {
        var actual = path.isAbsolute.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  //////////////////
  // IS BASE PATH //
  //////////////////

  describe('isBasePath', function () {

    var tests = [
      {args: ['/base/path', '/base/path'], expected: true},
      {args: ['C:/base/path', 'C:/base/path'], expected: true},
      {args: ['C:\\base\\path', 'C:\\base\\path'], expected: true},

      {args: ['/base/path/', '/base/path'], expected: true},
      {args: ['C:/base/path/', 'C:/base/path'], expected: true},
      {args: ['C:\\base\\path\\', 'C:\\base\\path'], expected: true},

      {args: ['/base/path/sub', '/base/path'], expected: false},
      {args: ['C:/base/path/sub', 'C:/base/path'], expected: false},
      {args: ['C:\\base\\path\\sub', 'C:\\base\\path'], expected: false},

      {args: ['/base/path', '/base/path/sub'], expected: true},
      {args: ['C:/base/path', 'C:/base/path/sub'], expected: true},
      {args: ['C:\\base\\path', 'C:\\base\\path\\sub'], expected: true},

      {args: ['/', '/second'], expected: true},
      {args: ['C:/', 'C:/base'], expected: true},
      {args: ['C:', 'C:/base'], expected: true},
      {args: ['C:\\', 'C:\\base'], expected: true},
      {args: ['C:/', 'C:\\base'], expected: true},
      {args: ['C:/base/path', 'D:/base/path'], expected: false}
    ];

    tests.forEach(function (test) {
      it('correctly checks path bases: ' + test.args[0] + ' against ' + test.args[1], function () {
        var actual = path.isBasePath.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });


  //////////////
  // IS LOCAL //
  //////////////

  describe('isLocal', function () {

    var tests = [
      {args: ['/bg.jpg'],                   expected: true},
      {args: ['bg.jpg'],                    expected: true},
      {args: ['http://example.com/bg.jpg'], expected: false},
      {args: ['http://example.com'],        expected: false},
      {args: [''],                          expected: false}
    ];

    tests.forEach(function (test) {
      it('correctly checks if the path is local: ' + test.args[0], function () {
        var actual = path.isLocal.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  /////////////////
  // IS RELATIVE //
  /////////////////

  describe('isRelative', function () {

    var tests = [
      {args: ['/node/site/style.css'],    expected: false},
      {args: ['/'],                       expected: false},
      {args: ['node/site/style.css'],     expected: true},
      {args: [''],                        expected: true},
      {args: ['\\node\\site\\style.css'], expected: false},
      {args: ['\\'],                      expected: false},
      {args: ['node\\site\\style.css'],   expected: true},
      {args: ['C:/css/style.css'],        expected: false},
      {args: ['D:/'],                     expected: false},
      {args: ['E:\\css\\style.css'],      expected: false},
      {args: ['F:\\'],                    expected: false},
      {args: ['file:///css/style.css'],   expected: false},
      {args: ['file:///'],                expected: false},
      {args: ['C:'],                      expected: false},
      {args: ['C:css/style.css'],         expected: true}
    ];

    tests.forEach(function (test) {
      it('correctly checks if the given path is relative: ' + test.args[0], function () {
        var actual = path.isRelative.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  //////////
  // ITER //
  //////////

  describe('iter', function () {
  });

  //////////
  // JOIN //
  //////////

  describe('join', function () {

    var tests = [
      {args: [['', '']], expected: ''},
      {args: [['/path/to/test', '']], expected: '/path/to/test'},
      {args: [['/path/to//test', '']], expected: '/path/to/test'},
      {args: [['/path/to/test', 'subdir']], expected: '/path/to/test/subdir'},
      {args: [['/path/to/test/', 'subdir']], expected: '/path/to/test/subdir'},
      {args: [['/path/to/test', '/subdir']], expected: '/path/to/test/subdir'},
      {args: [['/path/to/test/', '/subdir']], expected: '/path/to/test/subdir'},
      {args: [['/path/to/test', './subdir']], expected: '/path/to/test/subdir'},
      {args: [['/path/to/test/', './subdir']], expected: '/path/to/test/subdir'},
      {args: [['/path/to/test', '../parentdir']], expected: '/path/to/parentdir'},
      {args: [['path/to/test/', '/subdir']], expected: 'path/to/test/subdir'},
      {args: [['path/to/test', '/subdir']], expected: 'path/to/test/subdir'},
      {args: [['../path/to/test', '/subdir']], expected: '../path/to/test/subdir'},
      {args: [['path', '../../subdir']], expected: '../subdir'},
      {args: [['/path', '../../subdir']], expected: '/subdir'},
      {args: [['../path', '../../subdir']], expected: '../../subdir'},
      {args: [['/path/to/test', 'subdir', '']], expected: '/path/to/test/subdir'},
      {args: [['/path', 'to', '/test']], expected: '/path/to/test'},
      {args: [['C:\\path\\to\\test', 'subdir']], expected: 'C:/path/to/test/subdir'},
      {args: [['C:\\path\\to\\test\\', 'subdir']], expected: 'C:/path/to/test/subdir'},
      {args: [['C:\\path\\to\\test', '/subdir']], expected: 'C:/path/to/test/subdir'},
      {args: [['C:\\path\\to\\test\\', '/subdir']], expected: 'C:/path/to/test/subdir'},
      {args: [['/', 'subdir']], expected: '/subdir'},
      {args: [['/', '/subdir']], expected: '/subdir'},
      {args: [['C:/', 'subdir']], expected: 'C:/subdir'},
      {args: [['C:/', '/subdir']], expected: 'C:/subdir'},
      {args: [['C:\\', 'subdir']], expected: 'C:/subdir'},
      {args: [['C:\\', '/subdir']], expected: 'C:/subdir'},
      {args: [['C:', 'subdir']], expected: 'C:/subdir'},
      {args: [['C:', '/subdir']], expected: 'C:/subdir'},
      {args: [['file://', '/path/to/test']], expected: 'file:///path/to/test'},
      {args: [['file:///', '/path/to/test']], expected: 'file:///path/to/test'},
      {args: [['file:///path/to/test', 'subdir']], expected: 'file:///path/to/test/subdir'},
      {args: [['file:///path/to/test', 'subdir/']], expected: 'file:///path/to/test/subdir'},
      {args: [['file:///path/to/test', '/subdir']], expected: 'file:///path/to/test/subdir'},
      {args: [['file:///path/to/test/', 'subdir']], expected: 'file:///path/to/test/subdir'},
      {args: [['file:///path/to/test/', '/subdir']], expected: 'file:///path/to/test/subdir'},
      {args: [['file://', 'C:/path/to/test']], expected: 'file://C:/path/to/test'},
      {args: [['file://', 'C:\\path\\to\\test']], expected: 'file://C:/path/to/test'}
    ];

    tests.forEach(function (test) {
      it('correctly join multiple paths: ' + test.args[0], function () {
        var actual = path.join.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  ///////////////
  // NORMALIZE //
  ///////////////

  describe('normalize', function () {

    it('should normalize the Windows-style path to forward slashes', function () {
      var str = 'C:\\user\\docs\\Letter.txt';
      assert.equal(path.normalize(str), 'C:/user/docs/Letter.txt', 'Windows-style path');
    });

    it('should keep the path unchanged', function () {
      var str = '/home/user/docs/';
      assert.equal(path.normalize(str), '/home/user/docs/', 'Already normalized');
    });

  });

  /////////////////////////////
  // REMOVE DIRECTORY ENDING //
  /////////////////////////////

  describe('removeDirectoryEnding', function () {

    var tests = [
      {args: ['/js/main.js'],           expected: '/js/main.js'},
      {args: ['\\js'],                  expected: '/js'},
      {args: ['\\'],                    expected: ''},
      {args: ['/'],                     expected: ''},
      {args: [''],                      expected: ''},
      {args: ['C:/js/'],                expected: 'C:/js'},
      {args: ['C:/js/hello/'],           expected: 'C:/js/hello'},
      {args: ['file:///css/'],           expected: 'file:///css'}
    ];

    tests.forEach(function (test) {
      it('correctly removes the directory ending of a path (if any): ' + test.args[0], function () {
        var actual = path.removeDirectoryEnding.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  ///////////////////////
  // REPLACE EXTENSION //
  ///////////////////////

  describe('replaceExtension', function () {

    var tests = [
      {args: ['/node/site/style.css', 'sass'],      expected: '/node/site/style.sass'},
      {args: ['/node/site/style.css', '.sass'],     expected: '/node/site/style.sass'},
      {args: ['/node/site/style.css.test', 'html'], expected: '/node/site/style.css.html'},
      {args: ['/node/site/style.css', ''],          expected: '/node/site/style.'},
      {args: ['/node/site/style.css.', 'test'],     expected: '/node/site/style.css.test'},
      {args: ['/node/site/style.css.', ''],         expected: '/node/site/style.css.'},
      {args: ['/node/site/', 'js'],                 expected: '/node/site/'},
      {args: ['/node/site', 'js'],                  expected: '/node/site.js'},
      {args: ['/', 'css'],                          expected: '/'},
      {args: ['', 'css'],                           expected: ''}
    ];

    tests.forEach(function (test) {
      it('correctly replaces the extension of ' + test.args[0] + ' with: ' + test.args[1], function () {
        var actual = path.replaceExtension.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

  ///////////
  // SPLIT //
  ///////////

  describe('split', function () {

    var tests = [
      {args: [''], expected: ['', '']},
      {args: ['C:/node'], expected: ['C:/', 'node']},
      {args: ['C:'], expected: ['C:/', '']},
      {args: ['/home/hero/test'], expected: ['/', 'home/hero/test']},
      {args: ['home/hero/test'], expected: ['', 'home/hero/test']}
    ];

    tests.forEach(function (test) {
      it('correctly splits the given path: ' + test.args[0], function () {
        var actual = path.split.apply(null, test.args);
        assert.deepEqual(actual, test.expected);
      });
    });

  });

  /////////////////
  // TO ABSOLUTE //
  /////////////////

  describe('toAbsolute', function () {

    var tests = [
      {args: ['css/./style.css', '/node/site'], expected: '/node/site/css/style.css'},
      {args: ['css/../style.css', '/node/site'], expected: '/node/site/style.css'},
      {args: ['css/./../style.css', '/node/site'], expected: '/node/site/style.css'},
      {args: ['css/.././style.css', '/node/site'], expected: '/node/site/style.css'},
      {args: ['./css/style.css', '/node/site'], expected: '/node/site/css/style.css'},

      {args: ['css\\.\\style.css', '\\node\\site'], expected: '/node/site/css/style.css'},
      {args: ['css\\..\\style.css', '\\node\\site'], expected: '/node/site/style.css'},
      {args: ['css\\.\\..\\style.css', '\\node\\site'], expected: '/node/site/style.css'},
      {args: ['css\\..\\.\\style.css', '\\node\\site'], expected: '/node/site/style.css'},
      {args: ['.\\css\\style.css', '\\node\\site'], expected: '/node/site/css/style.css'},

      {args: ['./css/style.css', '/'], expected: '/css/style.css'},
      {args: ['../css/style.css', '/'], expected: '/css/style.css'},
      {args: ['../css/./style.css', '/'], expected: '/css/style.css'},
      {args: ['../css/../style.css', '/'], expected: '/style.css'},
      {args: ['../css/./../style.css', '/'], expected: '/style.css'},
      {args: ['../css/.././style.css', '/'], expected: '/style.css'},

      {args: ['.\\css\\style.css', '\\'], expected: '/css/style.css'},
      {args: ['..\\css\\style.css', '\\'], expected: '/css/style.css'},
      {args: ['..\\css\\.\\style.css', '\\'], expected: '/css/style.css'},
      {args: ['..\\css\\..\\style.css', '\\'], expected: '/style.css'},
      {args: ['..\\css\\.\\..\\style.css', '\\'], expected: '/style.css'},
      {args: ['..\\css\\..\\.\\style.css', '\\'], expected: '/style.css'},

      {args: ['./css/style.css', 'C:/'], expected: 'C:/css/style.css'},
      {args: ['../css/style.css', 'C:/'], expected: 'C:/css/style.css'},
      {args: ['../css/./style.css', 'C:/'], expected: 'C:/css/style.css'},
      {args: ['../css/../style.css', 'C:/'], expected: 'C:/style.css'},
      {args: ['../css/./../style.css', 'C:/'], expected: 'C:/style.css'},
      {args: ['../css/.././style.css', 'C:/'], expected: 'C:/style.css'},

      {args: ['.\\css\\style.css', 'C:\\'], expected: 'C:/css/style.css'},
      {args: ['..\\css\\style.css', 'C:\\'], expected: 'C:/css/style.css'},
      {args: ['..\\css\\.\\style.css', 'C:\\'], expected: 'C:/css/style.css'},
      {args: ['..\\css\\..\\style.css', 'C:\\'], expected: 'C:/style.css'},
      {args: ['..\\css\\.\\..\\style.css', 'C:\\'], expected: 'C:/style.css'},
      {args: ['..\\css\\..\\.\\style.css', 'C:\\'], expected: 'C:/style.css'},

      {args: ['./css/style.css', 'file:///'], expected: 'file:///css/style.css'},
      {args: ['../css/style.css', 'file:///'], expected: 'file:///css/style.css'},
      {args: ['../css/./style.css', 'file:///'], expected: 'file:///css/style.css'},
      {args: ['../css/../style.css', 'file:///'], expected: 'file:///style.css'},
      {args: ['../css/./../style.css', 'file:///'], expected: 'file:///style.css'},
      {args: ['../css/.././style.css', 'file:///'], expected: 'file:///style.css'},

      {args: ['./css/style.css', 'file://C:/'], expected: 'file://C:/css/style.css'},
      {args: ['../css/style.css', 'file://C:/'], expected: 'file://C:/css/style.css'},
      {args: ['../css/./style.css', 'file://C:/'], expected: 'file://C:/css/style.css'},
      {args: ['../css/../style.css', 'file://C:/'], expected: 'file://C:/style.css'},
      {args: ['../css/./../style.css', 'file://C:/'], expected: 'file://C:/style.css'},
      {args: ['../css/.././style.css', 'file://C:/'], expected: 'file://C:/style.css'},

      {args: ['/css/style.css', '/node/site'], expected: '/css/style.css'},
      {args: ['\\css\\style.css', '/node/site'], expected: '/css/style.css'},
      {args: ['C:/css/style.css', 'C:/node/site'], expected: 'C:/css/style.css'},
      {args: ['D:\\css\\style.css', 'D:/node/site'], expected: 'D:/css/style.css'}
    ];

    tests.forEach(function (test) {
      it('correctly convert the given path to an absolute path: ' + test.args[0] + ' and base path: ' + test.args[1], function () {
        var actual = path.toAbsolute.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

    it('should throw an exception since the base path is not absolute', function () {
      assert.throws(function () {
        path.toAbsolute('/', '../css/../style.css');
      });
    });

  });

  /////////////////
  // TO RELATIVE //
  /////////////////

  describe('toRelative', function () {

    var tests = [
      {args: ['/node/site/../css/style.css', '/node/site'], expected: '../css/style.css'},
      {args: ['/node/site/.././css/style.css', '/node/site'], expected: '../css/style.css'},
      {args: ['/node/site/./../css/style.css', '/node/site'], expected: '../css/style.css'},
      {args: ['/node/site/../../css/style.css', '/node/site'], expected: '../../css/style.css'},
      {args: ['/node/site/css/style.css', '/node/./site'], expected: 'css/style.css'},
      {args: ['/node/site/css/style.css', '/node/../site'], expected: '../node/site/css/style.css'},
      {args: ['/node/site/css/style.css', '/node/./../site'], expected: '../node/site/css/style.css'},
      {args: ['/node/site/css/style.css', '/node/.././site'], expected: '../node/site/css/style.css'},
      {args: ['/node/site/css/style.css', '/node/../../site'], expected: '../node/site/css/style.css'},
      {args: ['/css', '/node/site'], expected: '../../css'},
      {args: ['/node/site', '/css'], expected: '../node/site'},
      {args: ['\\node\\site\\css\\style.css', '\\node\\site'], expected: 'css/style.css'},
      {args: ['\\node\\css\\style.css', '\\node\\site'], expected: '../css/style.css'},
      {args: ['\\css\\style.css', '\\node\\site'], expected: '../../css/style.css'},
      {args: ['C:/node/site/css/style.css', 'C:/node/site'], expected: 'css/style.css'},
      {args: ['C:/node/css/style.css', 'C:/node/site'], expected: '../css/style.css'},
      {args: ['C:/css/style.css', 'C:/node/site'], expected: '../../css/style.css'},
      {args: ['C:\\node\\site\\css\\style.css', 'C:\\node\\site'], expected: 'css/style.css'},
      {args: ['C:\\node\\css\\style.css', 'C:\\node\\site'], expected: '../css/style.css'},
      {args: ['C:\\css\\style.css', 'C:\\node\\site'], expected: '../../css/style.css'},
      {args: ['file:///node/site/css/style.css', 'file:///node/site'], expected: 'css/style.css'},
      {args: ['file:///node/css/style.css', 'file:///node/site'], expected: '../css/style.css'},
      {args: ['file:///css/style.css', 'file:///node/site'], expected: '../../css/style.css'},
      {args: ['file://C:/node/site/css/style.css', 'file://C:/node/site'], expected: 'css/style.css'},
      {args: ['file://C:/node/css/style.css', 'file://C:/node/site'], expected: '../css/style.css'},
      {args: ['file://C:/css/style.css', 'file://C:/node/site'], expected: '../../css/style.css'},
      {args: ['../style.css', '/'], expected: 'style.css'},
      {args: ['./style.css', '/'], expected: 'style.css'},
      {args: ['../../style.css', '/'], expected: 'style.css'},
      {args: ['..\\style.css', 'C:\\'], expected: 'style.css'},
      {args: ['.\\style.css', 'C:\\'], expected: 'style.css'},
      {args: ['..\\..\\style.css', 'C:\\'], expected: 'style.css'},
      {args: ['../style.css', 'C:/'], expected: 'style.css'},
      {args: ['./style.css', 'C:/'], expected: 'style.css'},
      {args: ['../../style.css', 'C:/'], expected: 'style.css'},
      {args: ['..\\style.css', '\\'], expected: 'style.css'},
      {args: ['.\\style.css', '\\'], expected: 'style.css'},
      {args: ['..\\..\\style.css', '\\'], expected: 'style.css'},
      {args: ['../style.css', 'file:///'], expected: 'style.css'},
      {args: ['./style.css', 'file:///'], expected: 'style.css'},
      {args: ['../../style.css', 'file:///'], expected: 'style.css'},
      {args: ['..\\style.css', 'file://C:\\'], expected: 'style.css'},
      {args: ['.\\style.css', 'file://C:\\'], expected: 'style.css'},
      {args: ['..\\..\\style.css', 'file://C:\\'], expected: 'style.css'},
      {args: ['css/../style.css', '/'], expected: 'style.css'},
      {args: ['css/./style.css', '/'], expected: 'css/style.css'},
      {args: ['css\\..\\style.css', 'C:\\'], expected: 'style.css'},
      {args: ['css\\.\\style.css', 'C:\\'], expected: 'css/style.css'},
      {args: ['css/../style.css', 'C:/'], expected: 'style.css'},
      {args: ['css/./style.css', 'C:/'], expected: 'css/style.css'},
      {args: ['css\\..\\style.css', '\\'], expected: 'style.css'},
      {args: ['css\\.\\style.css', '\\'], expected: 'css/style.css'},
      {args: ['css/../style.css', 'file:///'], expected: 'style.css'},
      {args: ['css/./style.css', 'file:///'], expected: 'css/style.css'},
      {args: ['css\\..\\style.css', 'file://C:\\'], expected: 'style.css'},
      {args: ['css\\.\\style.css', 'file://C:\\'], expected: 'css/style.css'},
      {args: ['css/style.css', '/node/site'], expected: 'css/style.css'},
      {args: ['css\\style.css', '\\node\\site'], expected: 'css/style.css'},
      {args: ['css/style.css', 'node/site'], expected: '../../css/style.css'},
      {args: ['css\\style.css', 'node\\site'], expected: '../../css/style.css'},
      {args: ['css/style.css', ''], expected: 'css/style.css'},
      {args: ['css\\style.css', ''], expected: 'css/style.css'},
      {args: ['/node/site/css/style.css', '\\node\\site'], expected: 'css/style.css'},
      {args: ['\\node\\site\\css\\style.css', '/node/site'], expected: 'css/style.css'}
    ];

    tests.forEach(function (test) {
      it('correctly convert the given path to a relative path: ' + test.args[0] + ' and base path: ' + test.args[1], function () {
        var actual = path.toRelative.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

    it('should throw an exception since the base path is not absolute', function () {
      assert.throws(function () {
        path.toRelative('/node/site/css/style.css', 'node/site');
      });

      assert.throws(function () {
        path.toRelative('/node/site/css/style.css', '');
      });
    });

    it('should throw an exception since the given paths do not have the same root', function () {
      assert.throws(function () {
        path.toRelative('C:/css/style.css', '/node/site');
      });
    });

  });

  ////////////
  // TO URI //
  ////////////

  describe('toUri', function () {

    var tests = [
      {args: ['/node/site/style.css'],        expected: 'file:///node/site/style.css'},
      {args: ['/node/site'],                  expected: 'file:///node/site'},
      {args: ['/'],                           expected: 'file:///'},
      {args: ['\\'],                          expected: 'file:///'},
      {args: [''],                            expected: ''},
      {args: ['file:///node/site'],           expected: 'file:///node/site'},
      {args: ['file://C:/node/site'],         expected: 'file://C:/node/site'},
      {args: ['file://C:\\node\\site'],       expected: 'file://C:/node/site'}
    ];

    tests.forEach(function (test) {
      it('correctly gets the URI from path: ' + test.args[0], function () {
        var actual = path.toUri.apply(null, test.args);
        assert.equal(actual, test.expected);
      });
    });

  });

});
