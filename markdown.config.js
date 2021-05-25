const fs = require('fs')
const { pipe } = require('fp-ts/function')

module.exports = {
  matchWord: 'GEN',
  transforms: {
    SNIPPET(content, { file, name }) {
      const src = fs.readFileSync(file).toString()
      const section = src.match(new RegExp(`// < ${name}\n((.|\n)*?)\n// >`))[1]

      return ['```ts', section, '```'].join('\n')
    },
  },
}
