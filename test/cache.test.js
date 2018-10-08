var t = require('tap')
var test = t.test
var DateFormatter = require('..')

test('should cache formatted date', (t) => {
  t.plan(2)
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter({ dateFormat: 'YYYY-MM-DD', cache: true })

  var formatted = dateFormatter.format(date)

  t.strictEquals(formatted, '2000-03-01')
  t.strictEquals(dateFormatter.cache, '2000-03-01')
})