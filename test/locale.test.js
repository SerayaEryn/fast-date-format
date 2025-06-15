import test from 'ava'
import { DateFormatter } from '../lib/DateFormatter.mjs'

test('MMMM', (t) => {
  var date = new Date(2000, 2, 1, 3, 4, 5, 1)
  var dateFormatter = new DateFormatter({ dateFormat: 'MMMM', locale: 'it' })

  var formatted = dateFormatter.format(date)

  t.is(formatted, 'Marzo')
})

test('dddd', (t) => {
  testFormatDate(t, 'dddd', 0, 'Martedì', 'it')
  testFormatDate(t, 'dddd', 1, 'Mercoledì', 'it')
  testFormatDate(t, 'dddd', 2, 'Giovedì', 'it')
  testFormatDate(t, 'dddd', 3, 'Venerdì', 'it')
  testFormatDate(t, 'dddd', 4, 'Sabato', 'it')
  testFormatDate(t, 'dddd', 5, 'Domenica', 'it')
  testFormatDate(t, 'dddd', 6, 'Lunedì', 'it')
  testFormatDate(t, 'dddd', 7, 'Martedì', 'it')
})

test('ddd', (t) => {
  testFormatDate(t, 'ddd', 0, 'Mar', 'it')
  testFormatDate(t, 'ddd', 1, 'Mer', 'it')
  testFormatDate(t, 'ddd', 2, 'Gio', 'it')
  testFormatDate(t, 'ddd', 3, 'Ven', 'it')
  testFormatDate(t, 'ddd', 4, 'Sab', 'it')
  testFormatDate(t, 'ddd', 5, 'Dom', 'it')
  testFormatDate(t, 'ddd', 6, 'Lun', 'it')
  testFormatDate(t, 'ddd', 7, 'Mar', 'it')
})

function testFormatDate (t, dateFormat, date1, h, locale) {
  var date = new Date(2000, 2, date1, 1, 4, 5, 1)
  var dateFormatter = new DateFormatter({ dateFormat, locale })
  var formatted = dateFormatter.format(date)
  t.is(formatted, h)
}
