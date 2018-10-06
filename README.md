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

const dateFormat = new DateFormat();

dateFormat.format('YYYYMMDD');
dateFormat.format('YYYYMMDD', new Date());
```

## Benchmark

```bash
$ npm run benchmark

> fast-date-format@1.0.0 benchmark 
> node benchmark/benchmark.js

moment x 379,597 ops/sec ±2.61% (82 runs sampled)
date-format x 591,309 ops/sec ±2.90% (79 runs sampled)
dateformat x 159,647 ops/sec ±1.42% (83 runs sampled)
fast-date-format x 3,236,908 ops/sec ±1.22% (87 runs sampled)
Fastest is fast-date-format
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

### format(dateFormat, [date])
Formats the `date` according to the `dateFormat`. If no date is passed the current date is used.

## License

[MIT](./LICENSE)
