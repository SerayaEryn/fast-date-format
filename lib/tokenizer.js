'use strict'

function tokenize (dateFormat) {
  var tokens = []
  var token = ''

  var size = dateFormat.length

  var nextChar = dateFormat.charAt(0)
  var char
  for (var index = 0; index < size; index++) {
    char = nextChar
    nextChar = dateFormat.charAt(index + 1)
    token += char
    if (nextChar !== char) {
      tokens.push(token)
      token = ''
    }
  }
  return tokens
}

module.exports = {
  tokenize
}
