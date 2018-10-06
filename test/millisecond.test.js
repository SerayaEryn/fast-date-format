'use strict'

var t = require('tap')
var test = t.test
var DateFormatter = require('..')

test('SSS', (t) => {
  t.plan(8)

  testFormatMillisecond(t, 'SSS', 0, '000')
  testFormatMillisecond(t, 'SSS', 1, '001')
  testFormatMillisecond(t, 'SSS', 9, '009')
  testFormatMillisecond(t, 'SSS', 10, '010')
  testFormatMillisecond(t, 'SSS', 59, '059')
  testFormatMillisecond(t, 'SSS', 99, '099')
  testFormatMillisecond(t, 'SSS', 100, '100')
  testFormatMillisecond(t, 'SSS', 999, '999')
})

function testFormatMillisecond (t, format, millisecond, h) {
  var date = new Date(2000, 2, 1, 1, 1, 1, millisecond)
  var dateFormatter = new DateFormatter(format)
  var formatted = dateFormatter.format(date)
  t.strictEquals(formatted, h)
}
