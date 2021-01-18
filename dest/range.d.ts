import { Coordinate } from './type';
/**
 * create an iterable iterator in range [0, end)
 * @param end end of range
 */
declare function xrange(end: number): Generator<number>;
/**
 * create an iterable iteratpr in range [start, end)
 * @param start start number
 * @param end end number
 * @param step step default 1
 */
declare function xrange(start: number, end?: number, step?: number): Generator<number>;
/**
 * create an iterable iterator in range [start, end)
 * @param shape shape of array
 * @param start start coordinate
 * @param end end coordinate
 */
declare function xrange(shape: number[], start?: Coordinate, end?: Coordinate): Generator<Coordinate>;
/**
 * create an iterable iterator in range [0, end)
 * @param end end of range
 */
declare function range(end: number): number[];
/**
 * create a list with step in range [start, end)
 * @param start start number
 * @param end end number
 * @param step step default 1
 */
declare function range(start: number, end: number, step?: number): number[];
/**
 * create a list in range [start, end)
 * @param shape shape of array
 * @param start start coordinate
 * @param end end coordinate
 */
declare function range(shape: number[], start?: Coordinate, end?: Coordinate): Coordinate[];
export { xrange, range };
