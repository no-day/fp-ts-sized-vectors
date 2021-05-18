/** @since 1.0.0 */

import * as A from 'fp-ts/ReadonlyArray';

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * Vector type of length `N` with fields of type `A`
 *
 * @since 1.0.0
 * @category Model
 */
export type Vec<N extends number, A> = TupleOf<N, A> & { _A: A; _N: N };

// -----------------------------------------------------------------------------
// Contructors
// -----------------------------------------------------------------------------

/**
 * Create an empty vector
 *
 * @since 1.0.0
 * @category Contructors
 */
export const empty = <T>(): Vec<0, T> => [] as Vec<0, T>;

/**
 * Prepend a value to the front of a vector
 *
 * @since 1.0.0
 * @category X
 */
export const prepend = <T>(x: T) => <N extends number>(
  xs: Vec<N, T>
): Vec<Succ<N>, T> => [x as any, ...xs] as any;

/**
 * Append a value to the end of a vector
 *
 * @since 1.0.0
 * @category X
 */
export const append = <T>(x: T) => <N extends number>(
  xs: Vec<N, T>
): Vec<Succ<N>, T> => [...xs, x as any] as any;

/**
 * Construct a vector containing only a single element
 *
 * @since 1.0.0
 * @category Contructors
 */
export const singleton = <T>(x: T): Vec<1, T> => [x] as Vec<1, T>;

/**
 * Shortcut for creating a 2d-Vec
 *
 * @since 1.0.0
 * @category Contructors
 */
export const vec2 = <T>(x: T, y: T): Vec<2, T> => [x, y] as Vec<2, T>;

/**
 * Shortcut for creating a 3d-Vec
 *
 * @since 1.0.0
 * @category Contructors
 */
export const vec3 = <T>(x: T, y: T, z: T): Vec<3, T> => [x, y, z] as Vec<3, T>;

// -----------------------------------------------------------------------------
// Functor
// -----------------------------------------------------------------------------

/**
 * Maps over a Vec's inner type
 *
 * @since 0.1.0
 * @category Functor
 */
export const map = <T1, T2>(f: (x: T1) => T2) => <N extends number>(
  vec: Vec<N, T1>
): Vec<N, T2> => A.map(f)(vec as ReadonlyArray<T1>) as Vec<N, T2>;

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type TupleOf<
  N extends number,
  X = any,
  xs extends any[] = []
> = xs['length'] extends N ? xs : TupleOf<N, X, [...xs, X]>;

type Add<N extends number, M extends number> = OnlyAs<
  number,
  [...TupleOf<N>, ...TupleOf<M>]['length']
>;

type OnlyAs<X, T> = T extends X ? T : never;

type Succ<N extends number> = Add<N, 1>;

type G<N extends number> = Add<1, N>;

// const overArray = <T1, T2>(f: (xs: ReadonlyArray<T1>) => ReadonlyArray<T2>) => <
//   N extends number
// >(
//   vec: Vec<N, T1>
// ): Vec<N, T2> => f(vec as ReadonlyArray<T1>) as Vec<N, T2>;
