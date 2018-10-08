'use strict'

var t = require('tap')
var test = t.test
var DateFormatter = require('..')

test('mm', (t) => {
  t.plan(5)

  testFormatMinute(t, 'mm', 0, '00')
  testFormatMinute(t, 'mm', 1, '01')
  testFormatMinute(t, 'mm', 9, '09')
  testFormatMinute(t, 'mm', 10, '10')
  testFormatMinute(t, 'mm', 59, '59')
})

test('m', (t) => {
  t.plan(5)

  testFormatMinute(t, 'm', 0, '0')
  testFormatMinute(t, 'm', 1, '1')
  testFormatMinute(t, 'm', 9, '9')
  testFormatMinute(t, 'm', 10, '10')
  testFormatMinute(t, 'm', 59, '59')
})

function testFormatMinute (t, format, minute, h) {
  var date = new Date(2000, 2, 1, 1, minute, 5, 1)
  var dateFormatter = new DateFormatter(format)
  var formatted = dateFormatter.format(date)
  t.strictEquals(formatted, h)
}
