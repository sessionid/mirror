import { Coordinate } from './type';
import { leq, lt, geq } from './position';

const xMatrixRangeReverse = function* (shape: number[], start?: Coordinate, end?: Coordinate): Generator<Coordinate>  {
    const coordinate = start? start.slice(0) : shape.map(() => 0);
    let depth;
    do {
        depth = shape.length - 1;
        while(coordinate[depth] >= 0) {
            if(end && geq(end, coordinate)) return;
            yield coordinate.slice(0);
            coordinate[depth] -= 1;
        }
        while(coordinate[depth] < 0) {
            coordinate[depth] = shape[depth] - 1;
            depth -= 1;
            coordinate[depth] -= 1;
        }

    }while(depth >= 0);
}

const xMatrixRangeWithEndInorder = function* (shape: number[], start?: Coordinate, end?: Coordinate): Generator<Coordinate> {
    /* initial start */
    const coordinate = start ? start.slice(0) : shape.map(() => 0);
    let depth;
    do {
        /* reset to the lowest bit */
        depth = shape.length - 1;
        while (coordinate[depth] < shape[depth]) {
            /* the end */
            if (leq(end, coordinate)) return;
            yield coordinate.slice(0);
            coordinate[depth] += 1;
        }
        /* carry bit */
        while (coordinate[depth] >= shape[depth]) {
            /* clear the lower bit */
            coordinate[depth] = 0;
            depth -= 1;
            coordinate[depth] += 1;
        }

    } while (depth >= 0);
}

const xMatrixRangeWithEnd = function* (shape: number[], start?: Coordinate, end?: Coordinate): Generator<Coordinate> {
    return yield* lt(start, end) ? xMatrixRangeWithEndInorder(shape, start, end) : xMatrixRangeReverse(shape, start, end);
}

const xMatrixRangeWithoutEnd = function* (shape: number[], start?: Coordinate): Generator<Coordinate> {
    /* initial start */
    const coordinate = start ? start.slice(0) : shape.map(() => 0);
    let depth;
    do {
        /* reset to the lowest bit */
        depth = shape.length - 1;
        while (coordinate[depth] < shape[depth]) {
            /* the end */
            yield coordinate.slice(0);
            coordinate[depth] += 1;
        }
        /* carry bit */
        while (coordinate[depth] >= shape[depth]) {
            /* clear the lower bit */
            coordinate[depth] = 0;
            depth -= 1;
            coordinate[depth] += 1;
        }

    } while (depth >= 0);
}

function xMatrixRange (shape: number[], start?: Coordinate): Generator<Coordinate>
function xMatrixRange (shape: number[], start?: Coordinate, end?: Coordinate): Generator<Coordinate>
function* xMatrixRange (shape: number[], start?: Coordinate, end?: Coordinate): Generator<Coordinate> {
    return yield* end === undefined ? xMatrixRangeWithoutEnd(shape, start) : xMatrixRangeWithEnd(shape, start, end);
}

function xNumberRange(end:number): Generator<number>
function xNumberRange (start: number, end?: number, step?: number): Generator<number>
function* xNumberRange (start: number, end?: number, step?: number): Generator<number> {
    // when step equals undefined or 0
    if (!step) {
        step = start > end ? -1 : 1;
    };
    if (end === undefined) {
        end = start;
        start = 0;
    }
    if (!(Number.isInteger(start) && Number.isInteger(end) && Number.isInteger(step))) {
        throw new Error('range() integer `start`, `end`, `step` arguments expected');
    }
    const offset = end - start;
    /* incorrect direction */
    if (offset / Math.abs(offset) !== step / Math.abs(step)) return;

    if (start < end) {
        for (let i = start; i < end; i += step) yield i;
    } else {
        for (let i = start; i > end; i += step) yield i;
    }
}

/**
 * create an iterable iterator in range [0, end)
 * @param end end of range
 */
function xrange(end: number): Generator<number>
/**
 * create an iterable iteratpr in range [start, end)
 * @param start start number
 * @param end end number
 * @param step step default 1
 */
function xrange(start: number, end?: number, step?: number): Generator<number>
/**
 * create an iterable iterator in range [start, end)
 * @param shape shape of array
 * @param start start coordinate
 * @param end end coordinate
 */
function xrange(shape: number[], start?: Coordinate, end?: Coordinate): Generator<Coordinate>
function* xrange(a, b?, c?): Generator<number | Coordinate> {
    return yield* (Array.isArray(a)) ? xMatrixRange(a, b, c) : xNumberRange(a, b, c);
}

/**
 * create an iterable iterator in range [0, end)
 * @param end end of range
 */
function range(end: number): number[]
/**
 * create a list with step in range [start, end)
 * @param start start number
 * @param end end number
 * @param step step default 1
 */
function range(start: number, end: number, step?: number): number[]
/**
 * create a list in range [start, end)
 * @param shape shape of array
 * @param start start coordinate
 * @param end end coordinate
 */
function range(shape: number[], start?: Coordinate, end?: Coordinate): Coordinate[]
function range(a, b?, c?): Coordinate[] | number[] {
    const ret = [];
    for (let i of xrange(a, b, c)) {
        ret.push(i);
    }
    return ret;
}

export { xrange, range };
