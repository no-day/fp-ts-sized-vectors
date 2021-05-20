import * as V from '../src'
import * as N from 'fp-ts-number-instances'

import Vec = V.Vec

const my2dVec: Vec<2, number> = V.vec2(31.5, 87.2)

const x2: number = V.lookup(0)(my2dVec)
const y2: number = V.lookup(1)(my2dVec)
const z2: unknown = V.lookup(2)(my2dVec)

const my3dVec: Vec<3, number> = V.append(0.0)(my2dVec)

const x3: number = V.lookup(0)(my3dVec)
const y3: number = V.lookup(1)(my3dVec)
const z3: number = V.lookup(2)(my3dVec)

const my3dVec2: Vec<3, number> = V.add(N.Semiring)(my3dVec)(my3dVec)
