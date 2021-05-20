/** @since 0.1.0 */

import * as A from 'fp-ts/ReadonlyArray'
import { Functor2 } from 'fp-ts/Functor'
import * as P from 'fp-ts/Pointed'
import { pipe } from 'fp-ts/function'
import { Apply2 } from 'fp-ts/lib/Apply'
import { Semiring } from 'fp-ts/lib/Semiring'

// -----------------------------------------------------------------------------
// model
// -----------------------------------------------------------------------------

/**
 * Vector type of length `N` with fields of type `A`
 *
 * @since 0.1.0
 * @category Model
 */
export type Vec<N, A> = ReadonlyArray<A> & { _N: N; _A: A; _URI: URI }

// -----------------------------------------------------------------------------
// contructors
// -----------------------------------------------------------------------------

/**
 * Create an empty vector
 *
 * @since 0.1.0
 * @category Contructors
 */
export const empty = <T>(): Vec<0, T> => [] as any

/**
 * Prepend a value to the front of a vector
 *
 * @since 0.1.0
 * @category Contructors
 */
export const prepend = <T>(x: T) => <N extends number>(
  xs: Vec<N, T>
): Vec<Succ<N>, T> => [x as any, ...xs] as any

/**
 * Append a value to the end of a vector
 *
 * @since 0.1.0
 * @category Contructors
 */
export const append = <T>(x: T) => <N extends number>(
  xs: Vec<N, T>
): Vec<Succ<N>, T> => [...xs, x as any] as any

/**
 * Construct a vector containing only a single element
 *
 * @since 0.1.0
 * @category Contructors
 */
export const singleton = <T>(x: T): Vec<1, T> => [x] as any

/**
 * Shortcut for creating a 2d-Vec
 *
 * @since 0.1.0
 * @category Contructors
 */
export const vec2 = <T>(x: T, y: T): Vec<2, T> => [x, y] as any

/**
 * Shortcut for creating a 3d-Vec
 *
 * @since 0.1.0
 * @category Contructors
 */
export const vec3 = <T>(x: T, y: T, z: T): Vec<3, T> => [x, y, z] as any

// -----------------------------------------------------------------------------
// utils
// -----------------------------------------------------------------------------

/**
 * TODO
 *
 * @since 0.1.0
 * @category Utils
 */
export const lookup = <I extends number>(i: I) => <N extends number, T>(
  vec: Vec<N, T>
): If<And<[IsNumLiteral<I>, IsNumLiteral<N>, LT<I, N>]>, T, unknown> =>
  vec[i] as any

// -----------------------------------------------------------------------------
// Pointed
// -----------------------------------------------------------------------------

/**
 * @since 0.1.0
 * @category Pointed
 */
export const of = <N extends number>(n: N) => <T>(x: T): Vec<N, T> =>
  A.replicate(n, x) as any

// -----------------------------------------------------------------------------
// Pointed
// -----------------------------------------------------------------------------

/**
 * Maps over a Vec's inner type
 *
 * @since 0.1.0
 * @category Functor
 */
export const map = <T1, T2>(f: (x: T1) => T2) => <N>(
  vec: Vec<N, T1>
): Vec<N, T2> => A.map(f)(vec as ReadonlyArray<T1>) as Vec<N, T2>

// -----------------------------------------------------------------------------
// Apply
// -----------------------------------------------------------------------------

/**
 * @since 0.1.0
 * @category Apply
 */
export const ap = <N, T1>(vec: Vec<N, T1>) => <T2>(
  fs: Vec<N, (x: T1) => T2>
): Vec<N, T2> => {
  let out: any = []
  for (const i in fs) {
    out[i] = (fs as any)[i](vec[i])
  }
  return out as any
}

// -----------------------------------------------------------------------------
// Semiring
// -----------------------------------------------------------------------------

/**
 * @since 0.1.0
 * @category Semiring
 */
export const add = <T>(St: Semiring<T>) => <N>(vec1: Vec<N, T>) => (
  vec2: Vec<N, T>
): Vec<N, T> => zip2(St.add)(vec1, vec2)

/**
 * @since 0.1.0
 * @category Semiring
 */
export const zero = <N extends number>(n: N) => <T>(
  St: Semiring<T>
): Vec<N, T> => of(n)(St.zero)

/**
 * @since 0.1.0
 * @category Semiring
 */
export const one = <N extends number>(n: N) => <T>(
  St: Semiring<T>
): Vec<N, T> => of(n)(St.one)

// export const mul = <T>(St: S.Semiring<T>) => (pt1: Point2d<T>) => (
//   pt2: Point2d<T>
// ): Point2d<T> =>
//   pipe(
//     of((x: T) => (y: T) => St.mul(x, y)),
//     ap(pt1),
//     ap(pt2)
//   )

// export const getSemiring = <T>(St: S.Semiring<T>): S.Semiring<Point2d<T>> => ({
//   add: add_(St),
//   zero: zero(St),
//   one: one(St),
//   mul: mul_(St),
// })

// -----------------------------------------------------------------------------
// Non-pipeables
// -----------------------------------------------------------------------------

const map_: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))

const ap_: Apply2<URI>['ap'] = (fa, f) => pipe(fa, ap(f))

// -----------------------------------------------------------------------------
// instances
// -----------------------------------------------------------------------------

/**
 * @since 0.1.0
 * @category Instances
 */
export const URI = 'Vec'

/**
 * @since 0.1.0
 * @category Instances
 */
export type URI = typeof URI

declare module 'fp-ts/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Vec<E, A>
  }
}

/**
 * @since 0.1.0
 * @category Instances
 */
export const Functor: Functor2<URI> = { URI: URI, map: map_ }

/**
 * @since 0.1.0
 * @category Instances
 */
export const getPointed = <N extends number>(n: N): P.Pointed<URI> => ({
  URI: URI,
  of: of(n),
})

/**
 * @since 0.1.0
 * @category Instances
 */
export const Apply: Apply2<URI> = { ...Functor, ap: ap_ }

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type TupleOf<
  N extends number = number,
  X = any,
  xs extends any[] = []
> = xs['length'] extends N ? xs : TupleOf<N, X, [...xs, X]>

type Add<N extends number, M extends number> = If<
  Or<[IsNum<N>, IsNum<M>]>,
  number,
  [...TupleOf<N>, ...TupleOf<M>]['length']
>

type OnlyAs<X, T> = T extends X ? T : never

type Succ<N extends number> = Add<N, 1>

type LT<N1 extends number, N2 extends number> = Compare<N1, N2> extends 'LT'
  ? true
  : false

type IsNumLiteral<N extends number> = number extends N ? false : true

type IsNum<N extends number> = Not<IsNumLiteral<N>>

type Not<B extends boolean> = B extends true ? false : true

type Compare<N1 extends number, N2 extends number> = Compare_<
  TupleOf<N1>,
  TupleOf<N2>
>

type And<Bs> = Bs extends [infer head, ...infer tail]
  ? head extends true
    ? And<tail>
    : false
  : true

type Or<Bs> = Bs extends [infer head, ...infer tail]
  ? head extends true
    ? true
    : Or<tail>
  : false

type Compare_<N1, N2> = [N1, N2] extends [[], []]
  ? 'EQ'
  : [N1, N2] extends [[infer _, ...infer tail1], [infer _, ...infer tail2]]
  ? Compare_<tail1, tail2>
  : N1 extends [infer _, ...infer tail]
  ? 'GT'
  : 'LT'

type If<P extends boolean, T, F> = P extends true ? T : F

const zip = <T1, TR>(f: (x1: T1) => TR) => <N>(
  vec1: Vec<N, T1>
): Vec<N, TR> => {
  let out: any = []
  for (const i in vec1) {
    out[i] = (f as any)(vec1[i])
  }
  return out as any
}

const zip2 = <T1, T2, TR>(f: (x1: T1, x2: T2) => TR) => <N>(
  vec1: Vec<N, T1>,
  vec2: Vec<N, T2>
): Vec<N, TR> => {
  let out: any = []
  for (const i in vec1) {
    out[i] = (f as any)(vec1[i], vec2[i])
  }
  return out as any
}
