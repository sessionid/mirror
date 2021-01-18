"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayGeneratorReverse = exports.arrayGenerator = exports.reduceBack = exports.reduce = exports.map = exports.filter = exports.every = exports.some = exports.forEachBack = exports.forEach = exports.eachBack = exports.each = void 0;
const basic_1 = require("./basic");
const range_1 = require("./range");
function* arrayGenerator(arr) {
    let list = arr.slice(0);
    const it = range_1.xrange(basic_1.shape(arr));
    while (list.length) {
        /* if <empty item>, skip it */
        if (0 in list) {
            const item = list.shift();
            if (Array.isArray(item)) {
                /* not use below code to avoid <empty item> in item */
                // list.unshift(...item);
                list = item.concat(list);
            }
            else {
                yield [item, it.next().value, arr];
            }
        }
        else {
            list.shift();
            it.next();
        }
    }
}
exports.arrayGenerator = arrayGenerator;
function* arrayGeneratorReverse(arr) {
    let list = arr.slice(0);
    const shapes = basic_1.shape(arr);
    const start = shapes.map(c => c - 1);
    const end = shapes.map(() => -1);
    const it = range_1.xrange(shapes, start, end);
    while (list.length) {
        /* if <empty item>, skip it */
        if (list.length - 1 in list) {
            const item = list.pop();
            if (Array.isArray(item)) {
                /* not use below code to avoid <empty item> in item */
                // list.unshift(...item);
                list = list.concat(item);
            }
            else {
                yield [item, it.next().value, arr];
            }
        }
        else {
            list.pop();
            it.next();
        }
    }
}
exports.arrayGeneratorReverse = arrayGeneratorReverse;
/**
 * iterate an array from the first item
 * @param arr array
 * @param fn callback
 */
const each = (arr, fn) => {
    for (let args of arrayGenerator(arr)) {
        fn(...args);
    }
};
exports.each = each;
exports.forEach = each;
/**
 * iterate an array from the last item
 * @param arr array
 * @param fn callback
 */
const eachBack = (arr, fn) => {
    for (let args of arrayGeneratorReverse(arr)) {
        fn(...args);
    }
};
exports.eachBack = eachBack;
exports.forEachBack = eachBack;
/**
 * like Array.some
 * @param arr array
 * @param fn callback
 */
const some = (arr, fn) => {
    for (let args of arrayGenerator(arr)) {
        if (fn(...args))
            return true;
    }
    return false;
};
exports.some = some;
/**
 * like Array.every
 * @param arr array
 * @param fn callback
 */
const every = (arr, fn) => {
    for (let args of arrayGenerator(arr)) {
        if (!fn(...args))
            return false;
    }
    return true;
};
exports.every = every;
/**
 * like Array.map
 * @param arr array
 * @param fn callback
 */
const map = (arr, fn) => {
    const shapes = basic_1.shape(arr);
    const it = range_1.xrange(shapes);
    const ret = [];
    let refs = [ret];
    let mrefs = [arr];
    let ln = shapes.length;
    for (let i of range_1.xrange(ln)) {
        const coordinate = shapes[i];
        const cacheRefs = [];
        const cacheMRefs = [];
        for (let idx of range_1.xrange(refs.length)) {
            const ref = refs[idx];
            const mref = mrefs[idx];
            if (i === ln - 1) {
                /**
                 * not use code below, cuz:
                 * [...Array(2)] will become [undefined, undefined]
                 */
                // ref.push(...mref.map(el => fn(el, it.next().value, arr)));
                ref.length = coordinate;
                mref.forEach((el, idx) => {
                    ref[idx] = fn(el, it.next().value, arr);
                });
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
exports.map = map;
/**
 * like Array.filter
 * @param arr array
 * @param fn callback
 */
const filter = (arr, fn) => {
    const shapes = basic_1.shape(arr);
    const it = range_1.xrange(shapes);
    const ret = [];
    let refs = [ret];
    let mrefs = [arr];
    let ln = shapes.length;
    for (let i of range_1.xrange(ln)) {
        const coordinate = shapes[i];
        const cacheRefs = [];
        const cacheMRefs = [];
        for (let idx of range_1.xrange(refs.length)) {
            const ref = refs[idx];
            const mref = mrefs[idx];
            if (i === ln - 1) {
                ref.length = coordinate;
                mref.forEach((el, idx) => {
                    fn(el, it.next().value, arr) && (ref[idx] = el);
                });
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
exports.filter = filter;
function reduceBasic(arr, fn, previousValue, isReverse = false) {
    const it = isReverse ? arrayGeneratorReverse(arr) : arrayGenerator(arr);
    let ret = previousValue;
    if (ret === undefined) {
        let result = it.next().value;
        if (result)
            ret = result[0];
        /* when empty array, return undefined */
        else
            return undefined;
    }
    for (let args of it) {
        ret = fn(ret, ...args);
    }
    return ret;
}
;
/**
 * like Array.reduce
 * @param arr array
 * @param fn callback
 */
const reduce = (arr, fn, previousValue) => reduceBasic(arr, fn, previousValue);
exports.reduce = reduce;
/**
 * like Array.reduceRight
 * @param arr array
 * @param fn callback
 */
const reduceBack = (arr, fn, previousValue) => reduceBasic(arr, fn, previousValue, true);
exports.reduceBack = reduceBack;
//# sourceMappingURL=iterate.js.map