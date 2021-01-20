"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = exports.reshape = exports.flat = exports.clone = void 0;
const range_1 = require("./range");
const basic_1 = require("./basic");
const create_1 = require("./create");
const flatSelf = (arr) => {
    let stack = arr.slice();
    const res = [];
    while (stack.length) {
        if (stack.length - 1 in stack) {
            const item = stack.pop();
            if (Array.isArray(item)) {
                const ln = stack.length + item.length;
                stack = stack.concat(item);
                stack.length = ln;
            }
            else {
                res.push(item);
            }
        }
        else {
            stack.pop();
        }
    }
    return res.reverse();
};
const flatStd = (arr) => arr.flat(Infinity);
const flat = Array.prototype.flat ? flatStd : flatSelf;
exports.flat = flat;
/**
 * split array into small piece
 * @param arr array
 * @param size piece size
 */
const splitArr = (arr, size = 1) => {
    const ret = [];
    for (let i of range_1.xrange(0, arr.length, size)) {
        ret.push(arr.slice(i, i + size));
    }
    return ret;
};
/**
 * reshape array
 * @param arr array
 * @param shape wanted shape of target array
 */
const reshape = (arr, shape) => {
    let ret = flat(arr);
    for (let i of range_1.xrange(shape.length - 1, 0, -1)) {
        ret = splitArr(ret, shape[i]);
    }
    return ret;
};
exports.reshape = reshape;
/**
 * deep clone an array
 * @param arr array
 */
const clone = (arr) => {
    const _shape = basic_1.shape(arr);
    const ret = [];
    let refs = [ret];
    let mrefs = [arr];
    let ln = _shape.length;
    for (let i of range_1.xrange(ln)) {
        const coordinate = _shape[i];
        const cacheRefs = [];
        const cacheMRefs = [];
        for (let idx of range_1.xrange(refs.length)) {
            const ref = refs[idx];
            const mref = mrefs[idx];
            if (i === ln - 1) {
                // ref.push(...mref);
                ref.length = mref.length;
                for (let i in mref) {
                    ref[i] = mref[i];
                }
            }
            else {
                for (let i of range_1.xrange(coordinate)) {
                    let arr = [];
                    ref.push(arr);
                    cacheRefs.push(arr);
                    cacheMRefs.push(mref[i]);
                }
            }
        }
        refs = cacheRefs;
        mrefs = cacheMRefs;
    }
    return ret;
};
exports.clone = clone;
/**
 * split array by the given window
 * @param arr array
 * @param window the size of the unit
 */
const split = (arr, window) => {
    const arrShape = basic_1.shape(arr);
    const end = window.map((v, idx) => Math.ceil(arrShape[idx] / v));
    const ret = create_1.createSparse(end);
    for (let coord of range_1.xrange(end)) {
        const sparse = create_1.createSparse(window);
        for (let subCoord of range_1.xrange(window)) {
            const realCoord = coord.map((c, i) => c * window[i] + subCoord[i]);
            const el = basic_1.get(arr, realCoord);
            el !== undefined && basic_1.set(sparse, subCoord, el);
        }
        basic_1.set(ret, coord, sparse);
    }
    return ret;
};
exports.split = split;
//# sourceMappingURL=transform.js.map