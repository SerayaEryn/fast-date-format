# fast-date-format

[![Build Status](https://travis-ci.org/SerayaEryn/fast-date-format.svg?branch=master)](https://travis-ci.org/SerayaEryn/fast-date-format)
[![Coverage Status](https://coveralls.io/repos/github/SerayaEryn/fast-date-format/badge.svg?branch=master)](https://coveralls.io/github/SerayaEryn/fast-date-format?branch=master)
[![NPM version](https://img.shields.io/npm/v/fast-date-format.svg?style=flat)](https://www.npmjs.com/package/fast-date-format) [![Greenkeeper badge](https://badges.greenkeeper.io/SerayaEryn/fast-date-format.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

`fast-date-format` is significantly faster than other date formatting modules. 

## Installation
```
npm install fast-date-format
```
## Example

```js
const DateFormat = require('fast-date-format');

const dateFormat = new DateFormat('YYYYMMDD');

dateFormat.format();
dateFormat.format(new Date());
```

## Escaping

To escape characters in a format, surround the characters with square brackets.

```js
const dateFormat = new DateFormat('[Month: ]MMMM');

dateFormat.format(); // Month: December
```

## API

Supported formatting tokens:

| Token         | Example	           | Description           |
| ------------- | ------------------ |---------------------- |
| YYYY          | `2018`             | Year                  |
| YY            | `18`               | 2 Digit Year          |
| MMMM          | `January..December`| Month name            |
| MMM           | `Jan..Dec`         | 3 letter month name   |
| MM            | `01..12`           | Month                 |
| M             | `1..12`            | Month                 |
| HH            | `00..23`           | Hours (24 hour time)  |
| H             | `0..23`            | Hours (24 hour time)  |
| hh            | `01..12`           | Hours (12 hour time)  |
| h             | `1..12`            | Hours (12 hour time)  |
| kk            | `01..24`           | Hours (24 hour time)  |
| k             | `1..24`            | Hours (24 hour time)  |
| A             | `am`, `pm`         | Post or ante meridiem |
| dddd          | `Monday..Sunday`   | Day name              |
| ddd           | `Mon..Sun`         | 3 letter day name    |
| DDDD          | `001..365`         | Day of year          |
| DDD           | `1..365`           | Day of year          |
| DD            | `01..31`           | Day of month         |
| D             | `1..31`            | Day of month         |
| E             | `1..7`             | Day of week          |
| m             | `0..59`            | Minutes              |
| mm            | `00..59`           | Minutes              |
| s             | `0..59`            | Seconds              |
| ss            | `00..59`           | Seconds              |
| SSS           | `000..999`         | Milliseconds         |
| ZZ            | `-02:00`           | Offset from UTC      |
| Z             | `-0200`            | Offset from UTC      |
| x             | `1528643900952`    | Unix timestamp in ms |

## API

### DateFormat(options)

Creates a new date formatter.

### options

Either a date format as a string or an object with the following properties:

#### dateFormat

A date format as a string.

#### cache (optional)

Enables caching to increase formatting speed if set to `true`. This is restricted to formats without milliseconds. Defaults to `false`.

### DateFormat#format([date])

Formats the `date` according to the `dateFormat`. If no date is passed the current date is used.

## Benchmark

```bash
$ node benchmark/benchmark.js
moment x 226,501 ops/sec ±0.74% (87 runs sampled)
date-format x 276,927 ops/sec ±0.61% (86 runs sampled)
dateformat x 112,760 ops/sec ±1.60% (85 runs sampled)
fast-date-format x 2,207,410 ops/sec ±0.62% (90 runs sampled)
fecha x 280,415 ops/sec ±1.27% (89 runs sampled)
speed-date x 2,035,050 ops/sec ±1.25% (89 runs sampled)
Fastest is fast-date-format
```

With activated `cache` option:

```bash
$ node benchmark/benchmarkCache.js
moment x 288,008 ops/sec ±1.88% (82 runs sampled)
date-format x 288,106 ops/sec ±0.52% (85 runs sampled)
dateformat x 131,345 ops/sec ±1.36% (83 runs sampled)
fast-date-format x 4,014,322 ops/sec ±1.94% (85 runs sampled)
fecha x 355,271 ops/sec ±1.46% (86 runs sampled)
speed-date x 2,670,824 ops/sec ±0.74% (90 runs sampled)
Fastest is fast-date-format
```

## License

[MIT](./LICENSE)
