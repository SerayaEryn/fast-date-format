'use strict';

var t = require('tap');
var test = t.test;
var DateFormatter = require('..');

test('MMMM', (t) => {
  t.plan(12);
  testMonthName(t, 0, 'January');
  testMonthName(t, 1, 'February');
  testMonthName(t, 2, 'March');
  testMonthName(t, 3, 'April');
  testMonthName(t, 4, 'May');
  testMonthName(t, 5, 'June');
  testMonthName(t, 6, 'July');
  testMonthName(t, 7, 'August');
  testMonthName(t, 8, 'September');
  testMonthName(t, 9, 'October');
  testMonthName(t, 10, 'November');
  testMonthName(t, 11, 'December');
})

test('MMM', (t) => {
  t.plan(12);
  test3LetterMonthName(t, 0, 'Jan');
  test3LetterMonthName(t, 1, 'Feb');
  test3LetterMonthName(t, 2, 'Mar');
  test3LetterMonthName(t, 3, 'Apr');
  test3LetterMonthName(t, 4, 'May');
  test3LetterMonthName(t, 5, 'Jun');
  test3LetterMonthName(t, 6, 'Jul');
  test3LetterMonthName(t, 7, 'Aug');
  test3LetterMonthName(t, 8, 'Sep');
  test3LetterMonthName(t, 9, 'Oct');
  test3LetterMonthName(t, 10, 'Nov');
  test3LetterMonthName(t, 11, 'Dec');
})

test('MM', (t) => {
  t.plan(13);
  testFormatMonth(t, 'MM', 0, '01')
  testFormatMonth(t, 'MM', 1, '02')
  testFormatMonth(t, 'MM', 2, '03')
  testFormatMonth(t, 'MM', 3, '04')
  testFormatMonth(t, 'MM', 4, '05')
  testFormatMonth(t, 'MM', 5, '06')
  testFormatMonth(t, 'MM', 6, '07')
  testFormatMonth(t, 'MM', 7, '08')
  testFormatMonth(t, 'MM', 8, '09')
  testFormatMonth(t, 'MM', 9, '10')
  testFormatMonth(t, 'MM', 10, '11')
  testFormatMonth(t, 'MM', 11, '12')
  testFormatMonth(t, 'MM', 12, '01')
})

test('M', (t) => {
  t.plan(13);
  testFormatMonth(t, 'M', 0, '1')
  testFormatMonth(t, 'M', 1, '2')
  testFormatMonth(t, 'M', 2, '3')
  testFormatMonth(t, 'M', 3, '4')
  testFormatMonth(t, 'M', 4, '5')
  testFormatMonth(t, 'M', 5, '6')
  testFormatMonth(t, 'M', 6, '7')
  testFormatMonth(t, 'M', 7, '8')
  testFormatMonth(t, 'M', 8, '9')
  testFormatMonth(t, 'M', 9, '10')
  testFormatMonth(t, 'M', 10, '11')
  testFormatMonth(t, 'M', 11, '12')
  testFormatMonth(t, 'M', 12, '1')
})

function testFormatMonth(t, format, month, h) {
  var date = new Date(2000, month, 1, 1, 4, 5, 1);
  var dateFormatter = new DateFormatter();
  var formatted = dateFormatter.format(format, date);
  t.strictEquals(formatted, h);
}

function testMonthName(t, month, name) {
  var date = new Date(2000, month, 1, 3, 4, 5, 1);
  var dateFormatter = new DateFormatter();
  var formatted = dateFormatter.format('MMMM', date);
  t.strictEquals(formatted, name);
}

function test3LetterMonthName(t, month, name) {
  var date = new Date(2000, month, 1, 3, 4, 5, 1);
  var dateFormatter = new DateFormatter();
  var formatted = dateFormatter.format('MMM', date);
  t.strictEquals(formatted, name);
}
