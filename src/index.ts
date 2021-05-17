/** @since 1.0.0 */

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * Vector type of length `N` with fields of type `A`
 *
 * @since 1.0.0
 * @category Model
 */
export type Vec<N extends number, A> = TupleOf<N, A>;

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type TupleOf<
  N extends number,
  X = void,
  xs extends any[] = []
> = xs['length'] extends N ? xs : TupleOf<N, X, [...xs, X]>;

type Add<N extends number, M extends number> = [
  ...TupleOf<N>,
  ...TupleOf<M>
]['length'];
