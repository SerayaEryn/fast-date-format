# fast-date-format

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

> fast-date-formatter@1.0.0 benchmark 
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
| m             | `1..60`            | Minutes              |
| mm            | `01..60`           | Minutes              |
| s             | `1..60`            | Seconds              |
| ss            | `01..60`           | Seconds              |
| SSS           | `000..999`         | Milliseconds         |
| ZZ            | `-02:00`           | Offset from UTC      |
| Z             | `-0200`            | Offset from UTC      |
| x             | `1528643900952`    | Unix timestamp in mx |

### format(dateFormat, [date])
Formats the `date` according to the `dateFormat`. If no date is passed the current date is used.;

## License

[MIT](./LICENSE)
