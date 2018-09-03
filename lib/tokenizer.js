'use strict'

function tokenize (dateFormat) {
  var tokens = []
  var chars = dateFormat.split('')

  var previousChar = null
  var token = ''

  for (var index = 0; index < chars.length; index++) {
    var char = chars[index]
    if (index !== 0 && previousChar !== char) {
      tokens.push(token)
      token = ''
      previousChar = null
    }
    token += char
    previousChar = char
  }

  tokens.push(token)
  return tokens
}

module.exports = {
  tokenize
}
