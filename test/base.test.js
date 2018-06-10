'use strict';

var t = require('tap');
var test = t.test;
var DateFormatter = require('..');

test('x', (t) => {
  t.plan(1);
  var date = new Date(2000, 2, 1, 3, 4, 5, 1);
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('x', date)

  t.strictEquals(formatted, '951876245001')
})

test('ZZ', (t) => {
  t.plan(1);
  var date = new Date(2000, 2, 1, 3, 4, 5, 1);
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('ZZ', date)

  t.ok(/[+-]\d{2}:\d{2}/.test(formatted))
})

test('Z', (t) => {
  t.plan(1);
  var date = new Date(2000, 2, 1, 3, 4, 5, 1);
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('Z', date)

  t.ok(/[+-]\d{4}/.test(formatted))
})

test('YYYYMMDD', (t) => {
  t.plan(1);
  var date = new Date(2000, 2, 1, 3, 4, 5, 1);
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('YYYYMMDD', date)

  t.strictEquals(formatted, '20000301')
})

test('YYYY-MM-DDTHH:mm:ss', (t) => {
  t.plan(1);
  var date = new Date(2000, 2, 1, 3, 4, 5, 1);
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('YYYY-MM-DDTHH:mm:ss', date)

  t.strictEquals(formatted, '2000-03-01T03:04:05')
})

test('YYYY-MM-DDTHH:mm:ss,SSS', (t) => {
  t.plan(1);
  var date = new Date(2000, 2, 1, 3, 4, 5, 1);
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('YYYY-MM-DDTHH:mm:ss,SSS', date)

  t.strictEquals(formatted, '2000-03-01T03:04:05,001')
})

test('YYYY-MM-DDTHH:mm:ss,SSS', (t) => {
  t.plan(1);
  var date = new Date(2000, 2, 1, 3, 4, 5, 111);
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('YYYY-MM-DDTHH:mm:ss,SSS', date)

  t.strictEquals(formatted, '2000-03-01T03:04:05,111')
})

test('x', (t) => {
  t.plan(1);
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('x')

  t.ok(formatted);
})

test('', (t) => {
  t.plan(1);
  var dateFormatter = new DateFormatter();

  dateFormatter.format('x')
  var formatted = dateFormatter.format('x')

  t.ok(formatted);
})

test('offset 60', (t) => {
  t.plan(1);
  var utcOffset = Function('offset', 'padZero2', 'return `${offset >= 0 ? \'+\':\'-\'}${padZero2(Math.abs(Math.floor(offset / 60)))}${padZero2(offset % 60)}`');

  var formatted = utcOffset(60, padZero2);

  t.strictEquals(formatted, '+0100')
})

test('offset 90', (t) => {
  t.plan(1);
  var utcOffset = Function('offset', 'padZero2', 'return `${offset >= 0 ? \'+\':\'-\'}${padZero2(Math.abs(Math.floor(offset / 60)))}${padZero2(offset % 60)}`');

  var formatted = utcOffset(90, padZero2);

  t.strictEquals(formatted, '+0130')
})

test('offset 180', (t) => {
  t.plan(1);
  var utcOffset = Function('offset', 'padZero2', 'return `${offset >= 0 ? \'+\':\'-\'}${padZero2(Math.abs(Math.floor(offset / 60)))}${padZero2(offset % 60)}`');

  var formatted = utcOffset(180, padZero2);

  t.strictEquals(formatted, '+0300')
})

test('offset 180', (t) => {
  t.plan(1);
  var utcOffset = Function('offset', 'padZero2', 'return `${offset >= 0 ? \'+\':\'-\'}${padZero2(Math.abs(Math.floor(offset / 60)))}${padZero2(offset % 60)}`');

  var formatted = utcOffset(-180, padZero2);

  t.strictEquals(formatted, '-0300')
})

function padZero2(integer) {
  if (integer > 9) {
    return integer;
  }
  return `0${integer}`;
}
