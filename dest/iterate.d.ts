import { Coordinate, DeepArray } from './type';
declare function arrayGenerator<T>(arr: DeepArray<T>): Generator<[item: T, coordinate: Coordinate, arr: DeepArray<T>]>;
declare function arrayGeneratorReverse<T>(arr: DeepArray<T>): Generator<[item: T, coordinate: Coordinate, arr: DeepArray<T>]>;
/**
 * iterate an array from the first item
 * @param arr array
 * @param fn callback
 */
declare const each: <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => void) => void;
/**
 * iterate an array from the last item
 * @param arr array
 * @param fn callback
 */
declare const eachBack: <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => void) => void;
/**
 * like Array.some
 * @param arr array
 * @param fn callback
 */
declare const some: <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => boolean) => boolean;
/**
 * like Array.every
 * @param arr array
 * @param fn callback
 */
declare const every: <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => boolean) => boolean;
/**
 * like Array.map
 * @param arr array
 * @param fn callback
 */
declare const map: <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => T) => DeepArray<T>;
/**
 * like Array.filter
 * @param arr array
 * @param fn callback
 */
declare const filter: <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => boolean) => DeepArray<T>;
/**
 * like Array.reduce
 * @param arr array
 * @param fn callback
 */
declare const reduce: <T>(arr: DeepArray<T>, fn: (previousValue: any, item: T, coordinate: Coordinate, arr: DeepArray<T>) => any, previousValue?: any) => any;
/**
 * like Array.reduceRight
 * @param arr array
 * @param fn callback
 */
declare const reduceBack: <T>(arr: DeepArray<T>, fn: (previousValue: any, item: T, coordinate: Coordinate, arr: DeepArray<T>) => any, previousValue?: any) => any;
export { each, eachBack, each as forEach, eachBack as forEachBack, some, every, filter, map, reduce, reduceBack, arrayGenerator, arrayGeneratorReverse, };
