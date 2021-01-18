"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdentity = exports.createDiagonal = exports.createRegular = exports.createZeros = exports.createSparse = void 0;
const range_1 = require("./range");
const basic_1 = require("./basic");
/**
 * create sparse matrix
 * @param shape shape of matrix
 * @param fill value for item
 */
const createSparse = (shape, fill) => {
    const shouldFill = fill !== undefined;
    const matrix = [];
    const ln = shape.length;
    let refs = [matrix];
    for (let i of range_1.xrange(ln)) {
        const coordinate = shape[i];
        const cacheRefs = [];
        for (let ref of refs) {
            if (i === ln - 1) {
                ref.length = coordinate;
                shouldFill && ref.fill(fill);
            }
            else {
                for (let c of range_1.xrange(coordinate)) {
                    let arr = [];
                    ref.push(arr);
                    cacheRefs.push(arr);
                }
            }
        }
        refs = cacheRefs;
    }
    return matrix;
};
exports.createSparse = createSparse;
/**
 * create zero matrix
 * @param shape shape of matrix
 */
const createZeros = (shape) => {
    return createSparse(shape, 0);
};
exports.createZeros = createZeros;
/**
 * create regular matrix
 * @param dimension dimension
 * @param fill value for item
 */
const createRegular = (dimension, fill = 0) => {
    const shape = Array.apply(null, { length: dimension }).fill(dimension);
    return createSparse(shape, fill);
};
exports.createRegular = createRegular;
function createDiagonal(dimension, fill) {
    const matrix = createRegular(dimension, 0);
    const setVal = Array.isArray(fill) ? (coordinate, idx) => basic_1.set(matrix, coordinate, fill[idx]) : coordinate => basic_1.set(matrix, coordinate, fill);
    for (let i of range_1.xrange(0, dimension)) {
        setVal(Array(dimension).fill(i), i);
    }
    return matrix;
}
exports.createDiagonal = createDiagonal;
;
/**
 * create identity matrix
 * @param dimension dimension
 */
const createIdentity = (dimension) => createDiagonal(dimension, 1);
exports.createIdentity = createIdentity;
//# sourceMappingURL=create.js.map