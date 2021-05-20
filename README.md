# fp-ts-sized-vectors

## Limitation

- Implementation of type level numbers ist constrained to very small numbers due to TypeScript's type level recursion limit.
- The behavior of negative type level numbers is unspecified.

## TODO (PR's welcome)

- Add more utility functions  
  See e.g.:
  - [fp-ts' Array module](https://gcanti.github.io/fp-ts/modules/Array.ts.html)
  - [purescript's sized-vectors package](https://pursuit.purescript.org/packages/purescript-sized-vectors)
