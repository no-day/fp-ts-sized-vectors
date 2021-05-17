---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Model](#model)
  - [Vec (type alias)](#vec-type-alias)

---

# Model

## Vec (type alias)

Vector type of length `N` with fields of type `A`

**Signature**

```ts
export type Vec<N extends number, A> = TupleOf<N, A>
```

Added in v1.0.0
