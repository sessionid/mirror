"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContainable = exports.rank = exports.clear = exports.get = exports.set = exports.count = exports.shape = void 0;
const range_1 = require("./range");
/**
 * get dimension list of arrary
 * @param arr array
 */
const shape = (arr) => {
    if (!Array.isArray(arr))
        return [];
    const dimensionList = [arr.length];
    let subArr = arr;
    while (Array.isArray(subArr[0])) {
        subArr = subArr[0];
        dimensionList.push(subArr.length);
    }
    return dimensionList;
};
exports.shape = shape;
/**
 * get rank of a array
 * @param arr array
 */
const rank = (arr) => {
    return shape(arr).length;
};
exports.rank = rank;
/**
 * count number of elements
 * @param arr array
 */
const count = (arr) => {
    const dimensionList = shape(arr);
    /* rank ≥ 1 */
    if (dimensionList.length) {
        return shape(arr).reduce((total, dimension) => total * dimension);
    }
    /* scalar */
    return 1;
};
exports.count = count;
/**
 * get the reference of arr[...coordinate]
 * @param arr array
 * @param coordinate coordinate
 */
const locate = (arr, coordinate) => {
    let ptr = arr;
    let ln = coordinate.length;
    const last = coordinate[ln - 1];
    for (let i of range_1.xrange(ln - 1)) {
        try {
            ptr = ptr[coordinate[i]];
        }
        catch (e) {
            throw new Error(`coordinate: ${JSON.stringify(coordinate)} out of range`);
        }
    }
    return { location: ptr, last };
};
/**
 * arr[...coordinate] = value
 * @param arr array
 * @param coordinate coordinate
 * @param value value
 */
const set = (arr, coordinate, value) => {
    try {
        const { location, last } = locate(arr, coordinate);
        location[last] = value;
    }
    catch {
        throw new Error(`coordinate: ${JSON.stringify(coordinate)} out of range`);
    }
    return value;
};
exports.set = set;
/**
 * get arr[...coordinate]
 * @param arr array
 * @param coordinate coordinate
 */
const get = (arr, coordinate) => {
    try {
        const { location, last } = locate(arr, coordinate);
        return location[last];
    }
    catch {
        return undefined;
    }
};
exports.get = get;
/**
 * delete arr[...coordinate]
 * @param arr array
 * @param coordinate coordinate
 */
const clear = (arr, coordinate) => {
    try {
        const { location, last } = locate(arr, coordinate);
        /* if location is scalar should return false but delete scalar[index] will still return true, for example: delete 1[0] */
        return Array.isArray(location) ? delete location[last] : false;
    }
    catch {
        return false;
    }
};
exports.clear = clear;
/**
 * if large array can contain small array
 * @param large large array
 * @param small small array
 */
const isContainable = (large, small) => {
    const ss = shape(small);
    const sl = shape(large);
    if (ss.length < sl.length)
        return true;
    else if (ss.length > sl.length)
        return false;
    return sl.every((dimension, idx) => dimension >= ss[idx]);
};
exports.isContainable = isContainable;
//# sourceMappingURL=basic.js.map