import { xrange } from './range';
import { shape, set, get } from './basic';
import { createSparse } from './create';
import { DeepArray, Shape } from './type';

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

// @ts-ignore
const flatStd = (arr: any[]): any[] => arr.flat(Infinity);
// @ts-ignore
const flat = 'flat' in Array.prototype && typeof Array.prototype.flat === 'function' ? flatStd : flatSelf;

/**
 * split array into small piece
 * @param arr array
 * @param size piece size
 */
const splitArr = (arr: any[], size = 1): any[] => {
    const ret = [];
    for(let i of xrange(0, arr.length, size)) {
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
    for (let i of xrange(shape.length - 1, 0, -1)) {
        ret = splitArr(ret, shape[i]);
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
};

/**
 * split array by the given window
 * @param arr array
 * @param window the size of the unit
 */
const split = <T>(arr:DeepArray<T>, window:Shape):DeepArray<T> => {
    const arrShape = shape(arr);
    const end = window.map((v, idx) => Math.ceil(arrShape[idx] / v));
    const ret = createSparse(end);
    for(let coord of xrange(end)) {
        const sparse = createSparse(window);
        for(let subCoord of xrange(window)) {
            const realCoord = coord.map((c, i) => c * window[i] + subCoord[i]);
            const el = get(arr, realCoord);
            el !== undefined && set(sparse, subCoord, el);
        }
        set(ret, coord, sparse);
    }
    return ret;
}

export {
    clone, flat, reshape, split,
};
