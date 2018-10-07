
let src = ''
for (let i = -720; i < 720; i++) {
  const offset = i
  const absOffset = offset < 0 ? -offset : offset 
  const offsetHours = ~~(absOffset / 60)
  const offsetMinutes = absOffset % 60
  src += `'${offset >= 0 ? '-':'+'}${offsetHours < 10 ? '0': ''}${offsetHours}${offsetMinutes < 10 ? '0': ''}${offsetMinutes}'`
  src += ', '
}
console.log(__dirname + '/js.js')
require('fs').writeFileSync(__dirname + '/js.js', src)