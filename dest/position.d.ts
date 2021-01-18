import { Coordinate } from './type';
/**
 * if c1 > c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
declare const gt: (c1: Coordinate, c2: Coordinate) => boolean;
/**
 * if c1 >= c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
declare const geq: (c1: Coordinate, c2: Coordinate) => boolean;
/**
 * if c1 < c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
declare const lt: (c1: Coordinate, c2: Coordinate) => boolean;
/**
 * if c1 <= c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
declare const leq: (c1: Coordinate, c2: Coordinate) => boolean;
/**
 * if c1 === c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
declare const eq: (c1: Coordinate, c2: Coordinate) => boolean;
/**
 * if c1 !== c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
declare const neq: (c1: Coordinate, c2: Coordinate) => boolean;
/**
 * get weightlist of array by shape
 * @param shape shape of array
 */
declare const weightByShape: (shape: number[]) => number[];
/**
 * get weightlist of array
 * @param arr array
 */
declare const weight: (arr: any[]) => number[];
/**
 * convert coordinate to index
 * @param coordinate coordinate
 * @param weightList weightlist of array
 */
declare const getIndexByWeight: (coordinate: Coordinate, weightList: number[]) => number;
/**
 * convert coordinate to index
 * @param coordinate coordinate
 * @param shape shape of array
 */
declare const getIndexByShape: (coordinate: Coordinate, shape: number[]) => number;
/**
 * convert coordinate to index
 * @param arr array
 * @param coordinate coordinate
 */
declare const getIndex: (arr: any[], coordinate: Coordinate) => number;
/**
 * convert index to coordinate by shape and weightlist
 * @param index index
 * @param shape shape of array
 * @param weightList weightlist of array
 */
declare const getCoordinateByWeightShape: (index: number, shape: number[], weightList: number[]) => Coordinate;
/**
 * convert index to coordinate by shape
 * @param index index
 * @param shapes shape of array
 */
declare const getCoordinateByShape: (index: number, shapes: number[]) => Coordinate;
/**
 * convert index to coordinate
 * @param arr array
 * @param shapes shape of array
 */
declare const getCoordinate: (arr: number[], index: number) => Coordinate;
export { gt, geq, lt, leq, eq, neq, weightByShape, weight, getIndexByShape as indexByShape, getIndexByWeight as indexByWeight, getIndex as index, getCoordinateByWeightShape as coordinateByWeightShape, getCoordinateByShape as coordinateByShape, getCoordinate as coordinate, };
