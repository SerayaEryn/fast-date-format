'use strict'

var test = require('ava')
var DateFormatter = require('..')

test('should cache formatted date', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter({ dateFormat: 'YYYY-MM-DD', cache: true })

  var formatted = dateFormatter.format(date)

  t.is(formatted, '2000-03-01')
  t.is(dateFormatter.cache, '2000-03-01')
})
