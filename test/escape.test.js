var t = require('tap')
var test = t.test
var DateFormatter = require('..')

test('should respect escaped chars', (t) => {
  t.plan(1)
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('[GMT]')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, 'GMT')
})

test('should allows square brackets in escaped chars', (t) => {
  t.plan(1)
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('[[GMT]')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '[GMT')
})

test('should allows square brackets in escaped chars', (t) => {
  t.plan(1)
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter('YYYY-MM-DDTHH:mm:ss.sss[Z]')

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '2000-03-01T03:04:05.sssZ')
})
