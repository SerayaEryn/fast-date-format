# fast-date-format

![Build Status](https://github.com/SerayaEryn/fast-date-format/workflows/ci/badge.svg)
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

## Tokens

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

Enables caching to increase formatting speed if set to `true`. Defaults to `false`.

### DateFormat#format([date])

Formats the `date` according to the `dateFormat`. If no date is passed the current date is used.

### DateFormat#addLocale(language, data)

Adds translations for the names of months and weekdays. 

```js
dateFormat.addLocale('en', {
  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
})
```
Three letter abbreviations of the names are being generated from the months and weekdays.

### DateFormat#setLocale(language)

Changes the locale of the `DateFormat` instace to `language`. Build-in languages: `en` & `de`.

```js
dateFormat.addLocale('en')
```

## Benchmark

The benchmark has been run with Node.js v10.16.3.

```bash
$ node benchmark/benchmark.js
moment x 268,396 ops/sec ±0.87% (88 runs sampled)
date-format x 380,505 ops/sec ±0.42% (91 runs sampled)
dateformat x 99,375 ops/sec ±0.91% (87 runs sampled)
fast-date-format x 1,116,499 ops/sec ±0.57% (86 runs sampled)
fecha x 230,543 ops/sec ±0.93% (93 runs sampled)
speed-date x 1,083,871 ops/sec ±0.65% (91 runs sampled)
date-fns x 101,370 ops/sec ±1.18% (89 runs sampled)
Fastest is fast-date-format
```

With activated `cache` option:

```bash
$ node benchmark/benchmarkCache.js
moment x 356,945 ops/sec ±0.92% (84 runs sampled)
date-format x 404,826 ops/sec ±0.63% (86 runs sampled)
dateformat x 111,103 ops/sec ±1.03% (86 runs sampled)
fast-date-format x 2,618,465 ops/sec ±0.90% (90 runs sampled)
fecha x 306,050 ops/sec ±0.51% (91 runs sampled)
speed-date x 1,950,085 ops/sec ±0.82% (86 runs sampled)
date-fns x 150,776 ops/sec ±0.47% (88 runs sampled)
Fastest is fast-date-format
```

## License

[MIT](./LICENSE)
