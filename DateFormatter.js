'use strict'

var months = require('./lib/months').months
var monthsShort = require('./lib/months').monthsShort
var days = require('./lib/days').days
var daysShort = require('./lib/days').daysShort
var dayCount = require('./lib/days').dayCount
var tokenizer = require('./lib/tokenizer')
var genfun = require('generate-function')

function DateFormatter (dateFormat) {
  this.dayCount = dayCount
  this.daysShort = daysShort
  this.days = days
  this.monthsShort = monthsShort
  this.months = months
  this.dayCount = dayCount
  this.formatter = buildFormatter(dateFormat).bind(this)
}

DateFormatter.prototype.format = function format (date) {
  if (!date) {
    date = new Date()
  }
  return this.formatter(date)
}

function buildFormatter (dateFormat) {
  var tokens = tokenizer.tokenize(dateFormat)
  const gen = genfun()
  gen('function format (now) {')
  generateVariables(tokens, gen);
  gen('return `' + tokens.map(processToken).join('') + '`')
  gen('}')
  return gen.toFunction()
}

/* eslint-disable no-template-curly-in-string */
var tokenToReplacement = {
  ZZ: '${offset >= 0 ? \'-\':\'+\'}${offsetHours < 10 ? \'0\': \'\'}${offsetHours}:${offsetMinutes < 10 ? \'0\': \'\'}${offsetMinutes}',
  Z: '${offset >= 0 ? \'-\' : \'+\'}${offsetHours < 10 ? \'0\' : \'\'}${offsetHours}${offsetMinutes < 10 ? \'0\' : \'\'}${offsetMinutes}',
  SSS: '${milliseconds < 100 ? \'0\' : \'\'}${milliseconds < 10 ? \'0\': \'\'}${milliseconds}',
  ss: '${seconds < 10 ? \'0\' : \'\'}${seconds}',
  s: '${seconds}',
  mm: '${minutes < 10 ? \'0\': \'\'}${minutes}',
  m: '${minutes}',
  E: '${now.getDay() + 1}',
  dddd: '${this.days[now.getDay()]}',
  ddd: '${this.daysShort[now.getDay()]}',
  x: '${now.getTime()}',
  HH: '${hours < 10 ? \'0\': \'\'}${hours}',
  H: '${hours}',
  hh: '${hours12 < 10 ? \'0\': \'\'}${hours12}',
  h: '${hours12}',
  kk: '${hours1 < 10 ? \'0\': \'\'}${hours1}',
  k: '${hours1}',
  A: '${hours < 12 ? \'am\' : \'pm\'}',
  DDDD: '${dayOfYear < 100 ? \'0\' : \'\'}${dayOfYear < 10 ? \'0\': \'\'}${dayOfYear}',
  DDD: '${dayOfYear}',
  DD: '${date < 10 ? \'0\': \'\'}${date}',
  D: '${date}',
  MMMM: '${this.months[now.getMonth()]}',
  MMM: '${this.monthsShort[now.getMonth()]}',
  MM: '${month < 9 ? \'0\': \'\'}${month + 1}',
  M: '${month + 1}',
  YYYY: '${year}',
  YY: '${year.toString().substring(2)}'
}
/* eslint-enable no-template-curly-in-string */

function generateVariables (tokens, gen) {
  if (tokens.indexOf('Z') !== -1 || tokens.indexOf('ZZ') !== -1) {
    gen('var offset = now.getTimezoneOffset()')
    gen('var absOffset = offset < 0 ? -offset : offset')
    gen('var offsetHours = ~~(absOffset / 60)')
    gen('var offsetMinutes = absOffset % 60')
  }
  if (tokens.indexOf('SSS') !== -1) {
    gen('var milliseconds = now.getMilliseconds()')
  }
  if (tokens.indexOf('s') !== -1 || tokens.indexOf('ss') !== -1) {
    gen('var seconds = now.getSeconds()')
  }
  if (tokens.indexOf('m') !== -1 || tokens.indexOf('mm') !== -1) {
    gen('var minutes = now.getMinutes()')
  }
  if (tokens.indexOf('H') !== -1 || tokens.indexOf('HH') !== -1 || tokens.indexOf('A') !== -1 || tokens.indexOf('h') !== -1 || tokens.indexOf('hh') !== -1) {
    gen('var hours = now.getHours()')
  }
  if (tokens.indexOf('D') !== -1 || tokens.indexOf('DD') !== -1 || tokens.indexOf('DDD') !== -1 || tokens.indexOf('DDDD') !== -1) {
    gen('var date = now.getDate()')
  }
  if (tokens.indexOf('YY') !== -1 || tokens.indexOf('YYYY') !== -1 || tokens.indexOf('DDD') !== -1 || tokens.indexOf('DDDD') !== -1) {
    gen('var year = now.getFullYear()')
  }
  if (tokens.indexOf('k') !== -1 || tokens.indexOf('kk') !== -1) {
    gen('var hours1 = now.getHours() + 1')
  }
  if (tokens.indexOf('h') !== -1 || tokens.indexOf('hh') !== -1) {
    gen('var hours12 = (hours + 11) % 12 + 1')
  }
  if (tokens.indexOf('M') !== -1 || tokens.indexOf('MM') !== -1 || tokens.indexOf('DDD') !== -1 || tokens.indexOf('DDDD') !== -1) {
    gen('var month = now.getMonth()')
  }
  if (tokens.indexOf('DDD') !== -1 || tokens.indexOf('DDDD') !== -1) {
    generateDayOfYear(gen)
  }
}

function processToken (token) {
  if (tokenToReplacement[token]) {
    return tokenToReplacement[token]
  }
  return token
}

function generateDayOfYear (gen) {
  gen(`var isLeapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
  var dayOfYear = this.dayCount[month] + date
  if (month > 1 && isLeapYear) {
    dayOfYear++
  }`)
}

module.exports = DateFormatter
