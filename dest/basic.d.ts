import { Coordinate, DeepArray } from './type';
/**
 * get dimension list of arrary
 * @param arr array
 */
declare const shape: (arr: any) => number[];
/**
 * get rank of a array
 * @param arr array
 */
declare const rank: (arr: any) => number;
/**
 * count number of elements
 * @param arr array
 */
declare const count: (arr: any) => number;
/**
 * arr[...coordinate] = value
 * @param arr array
 * @param coordinate coordinate
 * @param value value
 */
declare const set: <T>(arr: DeepArray<T>, coordinate: Coordinate, value: T) => T;
/**
 * get arr[...coordinate]
 * @param arr array
 * @param coordinate coordinate
 */
declare const get: <T>(arr: DeepArray<T>, coordinate: Coordinate) => T | DeepArray<T>;
/**
 * delete arr[...coordinate]
 * @param arr array
 * @param coordinate coordinate
 */
declare const clear: (arr: any[], coordinate: Coordinate) => boolean;
/**
 * if large array can contain small array
 * @param large large array
 * @param small small array
 */
declare const isContainable: (large: DeepArray<any>, small: DeepArray<any>) => boolean;
export { shape, count, set, get, clear, rank, isContainable, };
