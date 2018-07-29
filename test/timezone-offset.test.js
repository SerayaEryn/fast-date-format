'use strict';

var t = require('tap');
var test = t.test;
var DateFormatter = require('..');

test('offset 60', (t) => {
  t.plan(1);
  var date = {
    getTimezoneOffset() {
      return 60;
    }
  }
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('Z', date)

  t.strictEquals(formatted, '-0100')
})

test('offset 60', (t) => {
  t.plan(1);
  var date = {
    getTimezoneOffset() {
      return 60;
    }
  }
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('ZZ', date)

  t.strictEquals(formatted, '-01:00')
})

test('offset 90', (t) => {
  t.plan(1);
  var date = {
    getTimezoneOffset() {
      return 90;
    }
  }
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('Z', date)

  t.strictEquals(formatted, '-0130')
})

test('offset 90', (t) => {
  t.plan(1);
  var date = {
    getTimezoneOffset() {
      return 90;
    }
  }
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('ZZ', date)

  t.strictEquals(formatted, '-01:30')
})

test('offset 180 - Z', (t) => {
  t.plan(1);
  var date = {
    getTimezoneOffset() {
      return 180;
    }
  }
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('Z', date)

  t.strictEquals(formatted, '-0300')
})

test('offset 180 - Z', (t) => {
  t.plan(1);
  var date = {
    getTimezoneOffset() {
      return 180;
    }
  }
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('ZZ', date)

  t.strictEquals(formatted, '-03:00')
})

test('offset -180 Z', (t) => {
  t.plan(1);
  var date = {
    getTimezoneOffset() {
      return -180;
    }
  }
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('Z', date)

  t.strictEquals(formatted, '+0300')
})

test('offset -180 Z', (t) => {
  t.plan(1);
  var date = {
    getTimezoneOffset() {
      return -180;
    }
  }
  var dateFormatter = new DateFormatter();

  var formatted = dateFormatter.format('ZZ', date)

  t.strictEquals(formatted, '+03:00')
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