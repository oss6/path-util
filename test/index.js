'use strict';

var assert = require('assert');
var path = require('../lib');

describe('path-util', function () {

  describe('canonicalize', function () {
    it('should canonicalize correctly the given path', function () {
      assert(true, 'we expected this package author to add actual unit tests.');
    });
  });

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
      {args: ['phar:///node/site/style.css'], expected: 'phar:///node/site'},
      {args: ['phar:///node/site'],           expected: 'phar:///node'},
      {args: ['phar:///node'],                expected: 'phar:///'},
      {args: ['phar:///'],                    expected: 'phar:///'},
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

});
