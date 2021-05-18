---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Contructors](#contructors)
  - [empty](#empty)
  - [singleton](#singleton)
  - [vec2](#vec2)
  - [vec3](#vec3)
- [Functor](#functor)
  - [map](#map)
- [Instances](#instances)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getPointed](#getpointed)
- [Model](#model)
  - [Vec (type alias)](#vec-type-alias)
- [Pointed](#pointed)
  - [getOf](#getof)
- [X](#x)
  - [append](#append)
  - [prepend](#prepend)

---

# Contructors

## empty

Create an empty vector

**Signature**

```ts
export declare const empty: <T>() => Vec<0, T>
```

Added in v1.0.0

## singleton

Construct a vector containing only a single element

**Signature**

```ts
export declare const singleton: <T>(x: T) => Vec<1, T>
```

Added in v1.0.0

## vec2

Shortcut for creating a 2d-Vec

**Signature**

```ts
export declare const vec2: <T>(x: T, y: T) => Vec<2, T>
```

Added in v1.0.0

## vec3

Shortcut for creating a 3d-Vec

**Signature**

```ts
export declare const vec3: <T>(x: T, y: T, z: T) => Vec<3, T>
```

Added in v1.0.0

# Functor

## map

Maps over a Vec's inner type

**Signature**

```ts
export declare const map: <T1, T2>(f: (x: T1) => T2) => <N>(vec: Vec<N, T1>) => Vec<N, T2>
```

Added in v0.1.0

# Instances

## Functor

**Signature**

```ts
export declare const Functor: F.Functor2<'Vec'>
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

Added in v1.0.0

# Pointed

## getOf

**Signature**

```ts
export declare const getOf: <N extends number>(n: N) => <T>(x: T) => Vec<N, T>
```

Added in v0.1.0

# X

## append

Append a value to the end of a vector

**Signature**

```ts
export declare const append: <T>(
  x: T
) => <N extends number>(xs: Vec<N, T>) => Vec<OnlyAs<number, [...TupleOf<N, any, []>, any]['length']>, T>
```

Added in v1.0.0

## prepend

Prepend a value to the front of a vector

**Signature**

```ts
export declare const prepend: <T>(
  x: T
) => <N extends number>(xs: Vec<N, T>) => Vec<OnlyAs<number, [...TupleOf<N, any, []>, any]['length']>, T>
```

Added in v1.0.0
