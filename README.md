# Minimal CSV Formatter

[![Build Status](https://travis-ci.org/soroushj/node-minimal-csv-formatter.svg?branch=master)](https://travis-ci.org/soroushj/node-minimal-csv-formatter)
[![codecov](https://codecov.io/gh/soroushj/node-minimal-csv-formatter/branch/master/graph/badge.svg)](https://codecov.io/gh/soroushj/node-minimal-csv-formatter)

Transforms arrays into equivalent CSV strings. Conforms to [RFC 4180](https://tools.ietf.org/html/rfc4180), with the exception that, instead of `CRLF`, `LF` is used as line delimiter.

## Usage

```javascript
const csv = require('minimal-csv-formatter');

let singleRow = csv(['x', 'y']);
// 'x,y\n'

let multipleRows = csv([
  [1, 2],
  [3, 4],
]);
// '1,2\n3,4\n'

let emptyFields = csv([null, undefined]);
// ',\n'

let emptyRows = csv([
  [],
  null,
  undefined,
]);
// ''
```
