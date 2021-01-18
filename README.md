# mirror

lib for array

## Types

### `Coordinate`

`number[]`, coordinate for locating the position in array. For example, in array:

```ts
[[0,1],[2,3]];
```

the coordinate of `2` is `[1,0]` and for `3` in:

```ts
[
    [[0,1], [2,3]],
    [[4,5], [6,7]]
];
```

it is `[0, 1, 1]`.

### `DeepArray<T>`

`Array<T|DeepArray<T>>`, represents nested-array.

## methods

Checked checkbox means unit test covered.

- [x] Basic
    - [x] shape: `(arr: any):number[]`
    - [x] count: `(arr: any):number`
    - [x] set: `<T>(arr:DeepArray<T>, coordinate: Coordinate, value:T):T`
    - [x] get: `<T>(arr:DeepArray<T>, coordinate: Coordinate):DeepArray<T>|T`
    - [x] clear: `(arr:any[], coordinate: Coordinate):boolean`
    - [x] rank: `(arr: any):number`
    - [x] isContainable: `(large:DeepArray, small:DeepArray):boolean`
- [x] position
    - [x] gt: `(c1:Coordinate, c2:Coordinate):boolean`
    - [x] geq: `(c1:Coordinate, c2:Coordinate):boolean`
    - [x] lt: `(c1:Coordinate, c2:Coordinate):boolean`
    - [x] leq: `(c1:Coordinate, c2:Coordinate):boolean`
    - [x] eq: `(c1:Coordinate, c2:Coordinate):boolean`
    - [x] neq: `(c1:Coordinate, c2:Coordinate):boolean`
    - [x] weightByShape: `(shape:number[]):number[]`
    - [x] weight: `(arr:any[]):number[]`
    - [x] indexByWeight: `(coordinate:Coordinate, weightList:number[]):number`
    - [x] indexByShape: `(coordinate:Coordinate, shape:number[]):number`
    - [x] index: `(arr:any[], coordinate:Coordinate):number`
    - [x] coordinateByWeightShape: `(index:number, shape:number[], weightList:number[]):Coordinate`
    - [x] coordinateByShape: `(index:number, shapes:number[]):Coordinate`
    - [x] coordinate: `(arr:number[], index:number):Coordinate`
- [x] range
    - [x] xrange
        - `(end: number): Generator<number>`
        - `(start: number, end?: number, step?: number): Generator<number>`
        - `(shape: number[], start?: Coordinate, end?: Coordinate): Generator<Coordinate>`
    - [x] range
        - `(end: number): number[]`
        - `(start: number, end: number, step?: number): number[]`
        - `(shape: number[], start?: Coordinate, end?: Coordinate): Coordinate[]`
- [x] iterate
    - [x] each/forEach: `<T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => void): void`
    - [x] eachBack/forEachBack: `<T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => void): void`
    - [x] some: `<T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => boolean): boolean`
    - [x] every: `<T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => boolean): boolean`
    - [x] filter: `<T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => boolean): DeepArray<T>`
    - [x] map: `<T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => T): DeepArray<T>`
    - [x] reduce: `<T>(arr: DeepArray<T>, fn: (previousValue: any, item: T, coordinate: Coordinate, arr: DeepArray<T>) => any, previousValue?: any): any`
    - [x] reduceBack: `<T>(arr: DeepArray<T>, fn: (previousValue: any, item: T, coordinate: Coordinate, arr: DeepArray<T>) => any`
    - [x] arrayGenerator: `<T>(arr: DeepArray<T>): Generator<[item: T, coordinate: Coordinate, arr: DeepArray<T>]>`
    - [x] arrayGeneratorReverse: `(arr: DeepArray<T>): Generator<[item: T, coordinate: Coordinate, arr: DeepArray<T>]> `
- [x] transform
    - [x] clone: `(arr: any[]): any[]`
    - [x] flat: `(arr: any[]): any[]`
    - [x] reshape: `<T>(arr: DeepArray<T>, shape: number[]): DeepArray<T>`
- [x] create
    - [x] createSparse: `<T>(shape: number[], fill?: T): DeepArray<T|any>`
    - [x] createZeros: `(shape: number[]): DeepArray<number>`
    - [x] createRegular: `(dimension: number, fill: number = 0): DeepArray<number>`
    - [x] createDiagonal
        - `(dimension: number, diagonalElements: number[]): DeepArray<number>`
        - `createDiagonal(dimension: number, fill: number | number[]): DeepArray<number>`
    - [x] createIdentity: `(dimension: number): DeepArray<number>`
