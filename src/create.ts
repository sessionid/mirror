import { xrange } from './range';
import { DeepArray } from './type';
import { set } from './basic';
/**
 * create sparse matrix
 * @param shape shape of matrix
 * @param fill value for item
 */
const createSparse = <T>(shape: number[], fill?: T): DeepArray<T|any> => {
    const shouldFill = fill !== undefined;
    const matrix = [];
    const ln = shape.length;
    let refs = [matrix];
    for (let i of xrange(ln)) {
        const coordinate = shape[i];
        const cacheRefs = [];
        for (let ref of refs) {
            if (i === ln - 1) {
                ref.length = coordinate;
                shouldFill && ref.fill(fill);
            } else {
                for (let c of xrange(coordinate)) {
                    let arr = [];
                    ref.push(arr);
                    cacheRefs.push(arr);
                }
            }
        }
        refs = cacheRefs;
    }
    return matrix;
}

/**
 * create zero matrix
 * @param shape shape of matrix
 */
const createZeros = (shape: number[]): DeepArray<number> => {
    return createSparse(shape, 0);
}

/**
 * create regular matrix
 * @param dimension dimension
 * @param fill value for item
 */
const createRegular = (dimension: number, fill: number = 0): DeepArray<number> => {
    const shape = Array.apply(null, { length: dimension }).fill(dimension);
    return createSparse(shape, fill);
};

/**
 * create diagonal matrix
 * @param dimension dimension
 * @param fill value for item on diagonal
 */
function createDiagonal(dimension: number, fill: number): DeepArray<number>;
/**
 * create diagonal matrix
 * @param dimension dimension
 * @param diagonalElements values for item on diagonal
 */
function createDiagonal(dimension: number, diagonalElements: number[]): DeepArray<number>;
function createDiagonal(dimension: number, fill: number | number[]): DeepArray<number> {
    const matrix = createRegular(dimension, 0);

    const setVal = Array.isArray(fill) ? (coordinate, idx) => set(matrix, coordinate, fill[idx]) : coordinate => set(matrix, coordinate, fill);

    for (let i of xrange(0, dimension)) {
        setVal(Array(dimension).fill(i), i);
    }
    return matrix;
};

/**
 * create identity matrix
 * @param dimension dimension
 */
const createIdentity = (dimension: number): DeepArray<number> => createDiagonal(dimension, 1);

export { createSparse, createZeros, createRegular, createDiagonal, createIdentity };