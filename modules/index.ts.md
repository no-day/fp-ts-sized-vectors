---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Contructors](#contructors)
  - [append](#append)
  - [empty](#empty)
  - [prepend](#prepend)
  - [singleton](#singleton)
  - [vec2](#vec2)
  - [vec3](#vec3)
- [Functor](#functor)
  - [map](#map)
- [Instances](#instances)
  - [Apply](#apply-1)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getPointed](#getpointed)
- [Model](#model)
  - [Vec (type alias)](#vec-type-alias)
- [Pointed](#pointed)
  - [of](#of)
- [Semiring](#semiring)
  - [add](#add)
  - [one](#one)
  - [zero](#zero)
- [Utils](#utils)
  - [lookup](#lookup)

---

# Apply

## ap

**Signature**

```ts
export declare const ap: <N, T1>(vec: Vec<N, T1>) => <T2>(fs: Vec<N, (x: T1) => T2>) => Vec<N, T2>
```

Added in v0.1.0

# Contructors

## append

Append a value to the end of a vector

**Signature**

```ts
export declare const append: <T>(
  x: T
) => <N extends number>(
  xs: Vec<N, T>
) => Vec<If<Not<IsNumLiteral<N>> extends true ? true : false, number, [...TupleOf<N, any, []>, any]['length']>, T>
```

Added in v0.1.0

## empty

Create an empty vector

**Signature**

```ts
export declare const empty: <T>() => Vec<0, T>
```

Added in v0.1.0

## prepend

Prepend a value to the front of a vector

**Signature**

```ts
export declare const prepend: <T>(
  x: T
) => <N extends number>(
  xs: Vec<N, T>
) => Vec<If<Not<IsNumLiteral<N>> extends true ? true : false, number, [...TupleOf<N, any, []>, any]['length']>, T>
```

Added in v0.1.0

## singleton

Construct a vector containing only a single element

**Signature**

```ts
export declare const singleton: <T>(x: T) => Vec<1, T>
```

Added in v0.1.0

## vec2

Shortcut for creating a 2d-Vec

**Signature**

```ts
export declare const vec2: <T>(x: T, y: T) => Vec<2, T>
```

Added in v0.1.0

## vec3

Shortcut for creating a 3d-Vec

**Signature**

```ts
export declare const vec3: <T>(x: T, y: T, z: T) => Vec<3, T>
```

Added in v0.1.0

# Functor

## map

Maps over a Vec's inner type

**Signature**

```ts
export declare const map: <T1, T2>(f: (x: T1) => T2) => <N>(vec: Vec<N, T1>) => Vec<N, T2>
```

Added in v0.1.0

# Instances

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'Vec'>
```

Added in v0.1.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Vec'>
```

Added in v0.1.0

## URI

**Signature**

```ts
export declare const URI: 'Vec'
```

Added in v0.1.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v0.1.0

## getPointed

**Signature**

```ts
export declare const getPointed: <N extends number>(n: N) => P.Pointed<URI>
```

Added in v0.1.0

# Model

## Vec (type alias)

Vector type of length `N` with fields of type `A`

**Signature**

```ts
export type Vec<N, A> = ReadonlyArray<A> & { _N: N; _A: A; _URI: URI }
```

Added in v0.1.0

# Pointed

## of

**Signature**

```ts
export declare const of: <N extends number>(n: N) => <T>(x: T) => Vec<N, T>
```

Added in v0.1.0

# Semiring

## add

**Signature**

```ts
export declare const add: <T>(St: Semiring<T>) => <N>(vec1: Vec<N, T>) => (vec2: Vec<N, T>) => Vec<N, T>
```

Added in v0.1.0

## one

**Signature**

```ts
export declare const one: <N extends number>(n: N) => <T>(St: Semiring<T>) => Vec<N, T>
```

Added in v0.1.0

## zero

**Signature**

```ts
export declare const zero: <N extends number>(n: N) => <T>(St: Semiring<T>) => Vec<N, T>
```

Added in v0.1.0

# Utils

## lookup

TODO

**Signature**

```ts
export declare const lookup: <I extends number>(
  i: I
) => <N extends number, T>(
  vec: Vec<N, T>
) => If<
  IsNumLiteral<I> extends true
    ? IsNumLiteral<N> extends true
      ? LT<I, N> extends true
        ? true
        : false
      : false
    : false,
  T,
  unknown
>
```

Added in v0.1.0
