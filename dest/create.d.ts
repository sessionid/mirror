import { DeepArray } from './type';
/**
 * create sparse matrix
 * @param shape shape of matrix
 * @param fill value for item
 */
declare const createSparse: <T>(shape: number[], fill?: T) => DeepArray<any>;
/**
 * create zero matrix
 * @param shape shape of matrix
 */
declare const createZeros: (shape: number[]) => DeepArray<number>;
/**
 * create regular matrix
 * @param dimension dimension
 * @param fill value for item
 */
declare const createRegular: (dimension: number, fill?: number) => DeepArray<number>;
/**
 * create diagonal matrix
 * @param dimension dimension
 * @param fill value for item on diagonal
 */
declare function createDiagonal(dimension: number, fill: number): DeepArray<number>;
/**
 * create diagonal matrix
 * @param dimension dimension
 * @param diagonalElements values for item on diagonal
 */
declare function createDiagonal(dimension: number, diagonalElements: number[]): DeepArray<number>;
/**
 * create identity matrix
 * @param dimension dimension
 */
declare const createIdentity: (dimension: number) => DeepArray<number>;
export { createSparse, createZeros, createRegular, createDiagonal, createIdentity };
