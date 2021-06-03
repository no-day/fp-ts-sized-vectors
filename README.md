# fp-ts-sized-vectors

[![Test](https://github.com/no-day/create-fp-ts-lib/actions/workflows/build.yml/badge.svg)](https://github.com/no-day/fp-ts-sized-vectors/actions/workflows/build.yml)
![David](https://img.shields.io/david/no-day/fp-ts-sized-vectors)
![npm](https://img.shields.io/npm/v/fp-ts-sized-vectors)

[API Docs](https://no-day.github.io/fp-ts-sized-vectors)

---

<!-- GEN:START (TOC) -->

- [Install](#install)
- [Examples](#examples)
  - [Imports](#imports)
  - [Construction](#construction)
  - [Operations on vectors](#operations-on-vectors)
  - [Lookups](#lookups)
  - [Vectors of anything](#vectors-of-anything)
  - [Vector math](#vector-math)
- [Limitations](#limitations)
- [TODO (PR's welcome)](#todo-prs-welcome)
<!-- GEN:END -->

## Install

```
yarn add fp-ts fp-ts-sized-vectors
```

or

```
npm install fp-ts fp-ts-sized-vectors
```

## Examples

### Imports

<!-- GEN:START (SNIPPET:file=./examples/one.ts&name=imports) -->

```ts
import * as V from 'fp-ts-sized-vectors'
import * as N from 'fp-ts-number-instances'
import { pipe } from 'fp-ts/function'
import * as assert from 'assert'
import Vec = V.Vec
```

<!-- GEN:END -->

### Construction

The main type of this library is `Vec<N, A>`. It defines a vector of any given length `N` containing components or fields of any type `A`.

Let's first create a vector of length 2, and we'll use `number` as the type for the fields. You can think of it as a two dimensional vector, but that's just one of many possible interpretations.

<!-- GEN:START (SNIPPET:file=./examples/one.ts&name=vecA) -->

```ts
const vecA: Vec<2, number> = V.vec(10, 20)

assert.deepStrictEqual(vecA, [10, 20])
```

<!-- GEN:END -->

Then, let's create a vector of length 3, again using `number` for the fields.

<!-- GEN:START (SNIPPET:file=./examples/one.ts&name=vecB) -->

```ts
const vecB: Vec<3, number> = V.vec(30, 40, 50)

assert.deepStrictEqual(vecB, [30, 40, 50])
```

<!-- GEN:END -->

It's important to keep in mind, that those two vectors have _different types_.
And as you can see, behind the scenes those vectors are just plain arrays.

### Operations on vectors

Many operations on vectors that are provided by this library are _dependently typed_. This means, that the output type changes depending on the input types.

A good example for this is the `concat` operation. We pass in our vector of length 2 as well as the one of length 3. What we get returned is a new vector of length 5.

<!-- GEN:START (SNIPPET:file=./examples/one.ts&name=concat) -->

```ts
const vecAB: Vec<5, number> = V.concat(vecA)(vecB)

assert.deepStrictEqual(vecAB, [10, 20, 30, 40, 50])
```

<!-- GEN:END -->

### Lookups

The fact that the vectors carry their lengths as type level information gives us many useful compile time guarantees.
Below you can see that we receive a `number` for _in range_ indices and something of type `unknown` for _out of bounds_ indices.
That works because we specify the indices as number literals.

We do not receive any union types like `number | undefined` or `Option<number>`. That's one of the main advantages over the `Array` type.

Vec 2

<!-- GEN:START (SNIPPET:file=./examples/one.ts&name=lookupA) -->

```ts
const a_0: number = V.lookup(0)(vecA)
const a_1: number = V.lookup(1)(vecA)
const a_2: unknown = V.lookup(2)(vecA)
```

<!-- GEN:END -->

Vec 3

<!-- GEN:START (SNIPPET:file=./examples/one.ts&name=lookupB) -->

```ts
const b_0: number = V.lookup(0)(vecB)
const b_1: number = V.lookup(1)(vecB)
const b_2: number = V.lookup(2)(vecB)
const b_3: unknown = V.lookup(3)(vecB)
```

<!-- GEN:END -->

Vec 5

<!-- GEN:START (SNIPPET:file=./examples/one.ts&name=lookupAB) -->

```ts
const ab_0: number = V.lookup(0)(vecAB)
const ab_1: number = V.lookup(1)(vecAB)
const ab_2: number = V.lookup(2)(vecAB)
const ab_3: number = V.lookup(3)(vecAB)
const ab_4: number = V.lookup(4)(vecAB)
const ab_5: unknown = V.lookup(5)(vecAB)
```

<!-- GEN:END -->

### Vectors of anything

The size of vectors are captured as type level numbers, their inner value can be of arbitrary types. In the above example we used the `number` type as that's quite common. But we could also just define a vector of strings:

<!-- GEN:START (SNIPPET:file=./examples/one.ts&name=vecStr) -->

```ts
const vecStr: Vec<3, string> = V.vec('Hello', 'World', '!')
```

<!-- GEN:END -->

Unlike tuples, all components of a vector have to have the same type though.

### Vector math

However, let's stay with the previously used `Vec<N, number>` as we can do more interesting things with them. As long as the inner type has some arithmetic qualities, we can apply calculations like additions or multiplications component wise:

<!-- GEN:START (SNIPPET:file=./examples/one.ts&name=vecMath) -->

```ts
import NS = N.Semiring

const vecR: Vec<3, number> = pipe(
  V.vec(1, 2, 3),
  V.mul(NS)(V.vec(2, 2, 2)),
  V.add(NS)(V.vec(0.1, 0.2, 0.3))
)

assert.deepStrictEqual(vecR, [2.1, 4.2, 6.3])
```

<!-- GEN:END -->

## Limitations

- Implementation of type level numbers ist constrained to very small numbers due to TypeScript's type level recursion limit.
- The behavior of negative type level numbers and floats is unspecified.

## TODO (PR's welcome)

- Add more utility functions  
  See e.g.:
  - [fp-ts' Array module](https://gcanti.github.io/fp-ts/modules/Array.ts.html)
  - [purescript's sized-vectors package](https://pursuit.purescript.org/packages/purescript-sized-vectors)
