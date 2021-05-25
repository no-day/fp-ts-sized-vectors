// < imports
import * as V from 'fp-ts-sized-vectors'
import * as N from 'fp-ts-number-instances'
import { pipe } from 'fp-ts/function'
import * as assert from 'assert'
import Vec = V.Vec

// >

// < vecA
const vecA: Vec<2, number> = V.vec(10, 20)

assert.deepStrictEqual(vecA, [10, 20])
// >

// < vecB
const vecB: Vec<3, number> = V.vec(30, 40, 50)

assert.deepStrictEqual(vecB, [30, 40, 50])
// >

// < concat
const vecAB: Vec<5, number> = V.concat(vecA)(vecB)

assert.deepStrictEqual(vecAB, [10, 20, 30, 40, 50])
// >

// < lookupA
const a_0: number = V.lookup(0)(vecA)
const a_1: number = V.lookup(1)(vecA)
const a_2: unknown = V.lookup(2)(vecA)
// >

// < lookupB
const b_0: number = V.lookup(0)(vecB)
const b_1: number = V.lookup(1)(vecB)
const b_2: number = V.lookup(2)(vecB)
const b_3: unknown = V.lookup(3)(vecB)
// >

// < lookupAB
const ab_0: number = V.lookup(0)(vecAB)
const ab_1: number = V.lookup(1)(vecAB)
const ab_2: number = V.lookup(2)(vecAB)
const ab_3: number = V.lookup(3)(vecAB)
const ab_4: number = V.lookup(4)(vecAB)
const ab_5: unknown = V.lookup(5)(vecAB)
// >

// < vecStr
const vecStr: Vec<3, string> = V.vec('Hello', 'World', '!')
// >

// < vecMath
import NS = N.Semiring

const vecR: Vec<3, number> = pipe(
  V.vec(1, 2, 3),
  V.mul(NS)(V.vec(2, 2, 2)),
  V.add(NS)(V.vec(0.1, 0.2, 0.3))
)

assert.deepStrictEqual(vecR, [2.1, 4.2, 6.3])
// >

const vecC: Vec<3, number> = V.add(N.Semiring)(vecB)(vecB)
