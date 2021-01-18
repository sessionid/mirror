import { xrange } from './range';
import { shape } from './basic';
import { DeepArray } from './type';

const flatSelf = (arr: any[]): any[] => {
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
        } else {
            stack.pop();
        }
    }
    return res.reverse();
}

const flatStd = (arr: any[]): any[] => arr.flat(Infinity);
const flat = Array.prototype.flat ? flatStd : flatSelf;

/**
 * split array into small piece
 * @param arr array
 * @param size piece size
 */
const split = (arr: any[], size = 1): any[] => {
    const ret = [];
    for (let i = 0; i < arr.length; i += size) {
        ret.push(arr.slice(i, i + size));
    }
    return ret;
}

/**
 * reshape array
 * @param arr array
 * @param shape wanted shape of target array
 */
const reshape = <T>(arr: DeepArray<T>, shape: number[]): DeepArray<T> => {
    let ret = flat(arr);
    for (let i = shape.length - 1; i > 0; i -= 1) {
        ret = split(ret, shape[i]);
    }
    return ret;
}

/**
 * deep clone an array
 * @param arr array
 */
const clone = (arr: any[]) => {
    const _shape = shape(arr);
    const ret = [];
    let refs = [ret];
    let mrefs = [arr];
    let ln = _shape.length;

    for (let i of xrange(ln)) {
        const coordinate = _shape[i];
        const cacheRefs = [];
        const cacheMRefs = [];
        for (let idx of xrange(refs.length)) {
            const ref = refs[idx];
            const mref = mrefs[idx];
            if (i === ln - 1) {
                // ref.push(...mref);
                ref.length = mref.length;
                for (let i in mref) {
                    ref[i] = mref[i];
                }
            } else {
                for (let i of xrange(coordinate)) {
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
}

export {
    clone, flat, reshape,
};
