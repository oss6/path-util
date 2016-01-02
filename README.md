# path-util [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Utility for pathname manipulations

## Install

```sh
$ npm install --save path-util
```

## Usage

```js
var pathUtil = require('path-util');

var relPath = pathUtil.toRelative('/node/site/../css/style.css', '/node/site');
console.log(relPath);
// => '../css/style.css'

var dir = pathUtil.getDirectory('/node/site/style.css');
console.log(dir);
// => '/node/site'

var ext = pathUtil.getExtension('/node/site/style.css');
console.log(ext);
// => 'css'

// ...
```

## License

MIT © [oss6](oss6.github.io)


[npm-image]: https://badge.fury.io/js/path-util.svg
[npm-url]: https://npmjs.org/package/path-util
[travis-image]: https://travis-ci.org/oss6/path-util.svg?branch=master
[travis-url]: https://travis-ci.org/oss6/path-util
[daviddm-image]: https://david-dm.org/oss6/path-util.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/oss6/path-util
[coveralls-image]: https://coveralls.io/repos/oss6/path-util/badge.svg
[coveralls-url]: https://coveralls.io/r/oss6/path-util
