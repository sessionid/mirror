"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reshape = exports.flat = exports.clone = void 0;
const range_1 = require("./range");
const basic_1 = require("./basic");
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
const split = (arr, size = 1) => {
    const ret = [];
    for (let i = 0; i < arr.length; i += size) {
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
    for (let i = shape.length - 1; i > 0; i -= 1) {
        ret = split(ret, shape[i]);
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
//# sourceMappingURL=transform.js.map