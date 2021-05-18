import * as $ from '../src'
import * as fc from 'fast-check'
import { pipe } from 'fp-ts/function'

describe('Constructors', () => {
  describe('empty', () => {
    it('creates an empty array', () => {
      expect($.empty()).toStrictEqual([])
    })
  })

  describe('prepend', () => {
    it('prepends at the beginning', () => {
      fc.property(fc.string(), fc.string(), (x1, x2) => {
        expect(
          pipe($.empty<string>(), $.prepend(x1), $.prepend(x2))
        ).toStrictEqual([x2, x1])
      })
    })
  })

  describe('append', () => {
    it('appends at the end', () => {
      fc.property(fc.string(), fc.string(), (x1, x2) => {
        expect(
          pipe($.empty<string>(), $.append(x1), $.append(x2))
        ).toStrictEqual([x1, x2])
      })
    })
  })

  describe('singleton', () => {
    it('creates array of length 1', () => {
      fc.property(fc.string(), (x1) => {
        expect(pipe($.singleton(x1))).toStrictEqual([x1])
      })
    })
  })

  describe('vec2', () => {
    it('creates array of length 2', () => {
      fc.property(fc.string(), fc.string(), (x1, x2) => {
        expect(pipe($.vec2(x1, x2))).toStrictEqual([x1, x2])
      })
    })
  })

  describe('vec3', () => {
    it('creates array of length 3', () => {
      fc.property(fc.string(), fc.string(), fc.string(), (x1, x2, x3) => {
        expect(pipe($.vec3(x1, x2, x3))).toStrictEqual([x1, x2, x3])
      })
    })
  })
})

describe('Functor', () => {
  describe('map', () => {
    it('maps over all fields', () => {
      fc.property(fc.float(), fc.float(), fc.float(), (x1, x2, x3) => {
        expect(
          pipe(
            $.vec3(x1, x2, x3),
            $.map((x) => x.toString())
          )
        ).toStrictEqual([x1.toString(), x2.toString(), x3.toString()])
      })
    })
  })
})

describe('Pointed', () => {
  describe('getOf', () => {
    it('creates an array of length 3 filled the same value', () => {
      fc.property(fc.float(), (x1) => {
        expect(pipe($.getOf(3)(x1))).toStrictEqual([x1, x1, x1])
      })
    })
  })
})
