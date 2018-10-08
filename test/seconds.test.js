'use strict'

var t = require('tap')
var test = t.test
var DateFormatter = require('..')

test('ss', (t) => {
  t.plan(5)

  testFormatSecond(t, 'ss', 0, '00')
  testFormatSecond(t, 'ss', 1, '01')
  testFormatSecond(t, 'ss', 9, '09')
  testFormatSecond(t, 'ss', 10, '10')
  testFormatSecond(t, 'ss', 59, '59')
})

test('s', (t) => {
  t.plan(5)

  testFormatSecond(t, 's', 0, '0')
  testFormatSecond(t, 's', 1, '1')
  testFormatSecond(t, 's', 9, '9')
  testFormatSecond(t, 's', 10, '10')
  testFormatSecond(t, 's', 59, '59')
})

function testFormatSecond (t, format, second, h) {
  var date = new Date(2000, 2, 1, 1, 1, second, 1)
  var dateFormatter = new DateFormatter(format)
  var formatted = dateFormatter.format(date)
  t.strictEquals(formatted, h)
}
