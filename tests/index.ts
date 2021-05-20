import * as $ from '../src'
import * as fc from 'fast-check'
import { pipe } from 'fp-ts/function'
import * as N from 'fp-ts-number-instances'

describe('constructors', () => {
  describe('empty', () => {
    it('creates an empty array', () => {
      expect($.empty()).toStrictEqual([])
    })
  })

  describe('prepend', () => {
    it('prepends at the beginning', () => {
      fc.assert(
        fc.property(fc.string(), fc.string(), (x1, x2) => {
          expect(
            pipe($.empty<string>(), $.prepend(x1), $.prepend(x2))
          ).toStrictEqual([x2, x1])
        })
      )
    })
  })

  describe('append', () => {
    it('appends at the end', () => {
      fc.assert(
        fc.property(fc.string(), fc.string(), (x1, x2) => {
          expect(
            pipe($.empty<string>(), $.append(x1), $.append(x2))
          ).toStrictEqual([x1, x2])
        })
      )
    })
  })

  describe('singleton', () => {
    it('creates array of length 1', () => {
      fc.assert(
        fc.property(fc.string(), (x1) => {
          expect(pipe($.singleton(x1))).toStrictEqual([x1])
        })
      )
    })
  })

  describe('vec2', () => {
    it('creates array of length 2', () => {
      fc.assert(
        fc.property(fc.string(), fc.string(), (x1, x2) => {
          expect(pipe($.vec2(x1, x2))).toStrictEqual([x1, x2])
        })
      )
    })
  })

  describe('vec3', () => {
    it('creates array of length 3', () => {
      fc.assert(
        fc.property(fc.string(), fc.string(), fc.string(), (x1, x2, x3) => {
          expect(pipe($.vec3(x1, x2, x3))).toStrictEqual([x1, x2, x3])
        })
      )
    })
  })
})

describe('Functor', () => {
  describe('map', () => {
    it('maps over all fields', () => {
      fc.assert(
        fc.property(fc.float(), fc.float(), fc.float(), (x1, x2, x3) => {
          expect(
            pipe(
              $.vec3(x1, x2, x3),
              $.map((x) => x.toString())
            )
          ).toStrictEqual([x1.toString(), x2.toString(), x3.toString()])
        })
      )
    })
  })
})

describe('Pointed', () => {
  describe('getOf', () => {
    it('creates an array of length 3 filled the same value', () => {
      fc.assert(
        fc.property(fc.float(), (x1) => {
          expect(pipe($.of(3)(x1))).toStrictEqual([x1, x1, x1])
        })
      )
    })
  })
})

describe('Apply', () => {
  describe('ap', () => {
    it('applies the functions to all fields', () => {
      fc.assert(
        fc.property(fc.float(), fc.float(), fc.float(), (x1, x2, x3) => {
          expect(
            pipe(
              $.vec3(
                (x: number) => x.toString() + 'A',
                (x: number) => x.toString() + 'B',
                (x: number) => x.toString() + 'C'
              ),
              $.ap($.vec3(x1, x2, x3))
            )
          ).toStrictEqual([
            x1.toString() + 'A',
            x2.toString() + 'B',
            x3.toString() + 'C',
          ])
        })
      )
    })
  })
})

describe('Semiring', () => {
  describe('add', () => {
    it('adds two vectors', () => {
      fc.assert(
        fc.property(
          fc.tuple(fc.float(), fc.float(), fc.float()),
          fc.tuple(fc.float(), fc.float(), fc.float()),
          ([a1, a2, a3], [b1, b2, b3]) => {
            const va = $.vec3(a1, a2, a3)
            const vb = $.vec3(b1, b2, b3)
            expect($.add(N.Semiring)(va)(vb)).toStrictEqual([
              a1 + b1,
              a2 + b2,
              a3 + b3,
            ])
          }
        )
      )
    })
  })

  describe('zero', () => {
    it('produces a zero vector', () => {
      expect($.zero(3)(N.Semiring)).toStrictEqual([
        N.Semiring.zero,
        N.Semiring.zero,
        N.Semiring.zero,
      ])
    })
  })

  describe('one', () => {
    it('produces a unit vector', () => {
      expect($.one(3)(N.Semiring)).toStrictEqual([
        N.Semiring.one,
        N.Semiring.one,
        N.Semiring.one,
      ])
    })
  })

  describe('mul', () => {
    it('multiplies two vectors', () => {
      fc.assert(
        fc.property(
          fc.tuple(fc.float(), fc.float(), fc.float()),
          fc.tuple(fc.float(), fc.float(), fc.float()),
          ([a1, a2, a3], [b1, b2, b3]) => {
            const va = $.vec3(a1, a2, a3)
            const vb = $.vec3(b1, b2, b3)
            expect($.mul(N.Semiring)(va)(vb)).toStrictEqual([
              a1 * b1,
              a2 * b2,
              a3 * b3,
            ])
          }
        )
      )
    })
  })
})

describe('utils', () => {
  describe('lookup', () => {
    it('receives a value in bounds', () => {
      const a: string = $.lookup(0)($.vec2('a', 'b'))
      expect(a).toStrictEqual('a')
    })
    it('rejects a value in out of bounds', () => {
      const a: unknown = $.lookup(3)($.vec2('a', 'b'))
      expect(a).toStrictEqual(undefined)
    })
  })
})
