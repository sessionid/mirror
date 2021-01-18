"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinate = exports.coordinateByShape = exports.coordinateByWeightShape = exports.index = exports.indexByWeight = exports.indexByShape = exports.weight = exports.weightByShape = exports.neq = exports.eq = exports.leq = exports.lt = exports.geq = exports.gt = void 0;
const basic_1 = require("./basic");
const compare = (c1, c2, fn) => {
    for (let i = 0, ln = c1.length; i < ln; i += 1) {
        if (c1[i] === c2[i] && i < ln - 1)
            continue;
        return fn(c1[i], c2[i]) ? true : false;
    }
    return false;
};
/**
 * if c1 > c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const gt = (c1, c2) => compare(c1, c2, (c1, c2) => c1 > c2);
exports.gt = gt;
/**
 * if c1 >= c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const geq = (c1, c2) => compare(c1, c2, (c1, c2) => c1 >= c2);
exports.geq = geq;
/**
 * if c1 < c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const lt = (c1, c2) => gt(c2, c1);
exports.lt = lt;
/**
 * if c1 <= c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const leq = (c1, c2) => geq(c2, c1);
exports.leq = leq;
/**
 * if c1 === c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const eq = (c1, c2) => compare(c1, c2, (c1, c2) => c1 === c2);
exports.eq = eq;
/**
 * if c1 !== c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const neq = (c1, c2) => !eq(c1, c2);
exports.neq = neq;
/**
 * get weightlist of array by shape
 * @param shape shape of array
 */
const weightByShape = (shape) => {
    const last = shape.length - 1;
    if (shape[last] < 0 || shape[0] < 0)
        throw new Error('invalid shape');
    const identity = shape[last] ? 1 : 0;
    const weightList = [identity];
    for (let i = last, weight = identity; i > 0; i -= 1) {
        const dimension = shape[i];
        if (dimension < 0)
            throw new Error('invalid shape');
        weight *= dimension;
        weightList.unshift(weight);
    }
    return weightList;
};
exports.weightByShape = weightByShape;
/**
 * get weightlist of array
 * @param arr array
 */
const weight = (arr) => weightByShape(basic_1.shape(arr));
exports.weight = weight;
/**
 * convert coordinate to index
 * @param coordinate coordinate
 * @param weightList weightlist of array
 */
const getIndexByWeight = (coordinate, weightList) => {
    if (coordinate.length !== weightList.length)
        throw new Error(`coordinate ${JSON.stringify(coordinate)} and weightlist ${JSON.stringify(weightList)} not match`);
    return coordinate.reduce((ret, v, idx) => {
        return ret + v * weightList[idx];
    }, 0);
};
exports.indexByWeight = getIndexByWeight;
/**
 * convert coordinate to index
 * @param coordinate coordinate
 * @param shape shape of array
 */
const getIndexByShape = (coordinate, shape) => {
    if (coordinate.length !== shape.length
        || coordinate.some((c, idx) => c >= shape[idx]))
        return -1;
    return getIndexByWeight(coordinate, weightByShape(shape));
};
exports.indexByShape = getIndexByShape;
/**
 * convert coordinate to index
 * @param arr array
 * @param coordinate coordinate
 */
const getIndex = (arr, coordinate) => {
    return getIndexByShape(coordinate, basic_1.shape(arr));
};
exports.index = getIndex;
/**
 * convert index to coordinate by shape and weightlist
 * @param index index
 * @param shape shape of array
 * @param weightList weightlist of array
 */
const getCoordinateByWeightShape = (index, shape, weightList) => {
    if (shape.length !== weightList.length)
        throw new Error(`shape ${JSON.stringify(shape)} and weightList ${JSON.stringify(weightList)} not match`);
    return weightList.map((weight, idx) => {
        return Math.floor(index / weight) % shape[idx];
    });
};
exports.coordinateByWeightShape = getCoordinateByWeightShape;
/**
 * convert index to coordinate by shape
 * @param index index
 * @param shapes shape of array
 */
const getCoordinateByShape = (index, shapes) => {
    return getCoordinateByWeightShape(index, shapes, weightByShape(shapes));
};
exports.coordinateByShape = getCoordinateByShape;
/**
 * convert index to coordinate
 * @param arr array
 * @param shapes shape of array
 */
const getCoordinate = (arr, index) => {
    return getCoordinateByShape(index, basic_1.shape(arr));
};
exports.coordinate = getCoordinate;
//# sourceMappingURL=position.js.map