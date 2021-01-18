import { Coordinate, DeepArray } from './type';
import { shape } from './basic';
import { xrange } from './range';

function* arrayGenerator<T>(arr: DeepArray<T>): Generator<[item: T, coordinate: Coordinate, arr: DeepArray<T>]> {
    let list = arr.slice(0);
    const it = xrange(shape(arr));
    while (list.length) {
        /* if <empty item>, skip it */
        if (0 in list) {
            const item = list.shift();
            if (Array.isArray(item)) {
                /* not use below code to avoid <empty item> in item */
                // list.unshift(...item);
                list = item.concat(list);
            } else {
                yield [item, it.next().value, arr];
            }
        } else {
            list.shift();
            it.next();
        }
    }
}

function* arrayGeneratorReverse<T>(arr: DeepArray<T>): Generator<[item: T, coordinate: Coordinate, arr: DeepArray<T>]> {
    let list = arr.slice(0);
    const shapes = shape(arr)
    const start = shapes.map(c => c - 1);
    const end = shapes.map(() => -1);
    const it = xrange(shapes, start, end);
    while (list.length) {
        /* if <empty item>, skip it */
        if (list.length - 1 in list) {
            const item = list.pop();
            if (Array.isArray(item)) {
                /* not use below code to avoid <empty item> in item */
                // list.unshift(...item);
                list = list.concat(item);
            } else {
                yield [item, it.next().value, arr];
            }
        } else {
            list.pop();
            it.next();
        }
    }
}

/**
 * iterate an array from the first item
 * @param arr array
 * @param fn callback
 */
const each = <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => void): void => {
    for (let args of arrayGenerator(arr)) {
        fn(...args);
    }
};

/**
 * iterate an array from the last item
 * @param arr array
 * @param fn callback
 */
const eachBack = <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => void): void => {
    for (let args of arrayGeneratorReverse(arr)) {
        fn(...args);
    }
};

/**
 * like Array.some
 * @param arr array
 * @param fn callback
 */
const some = <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => boolean): boolean => {
    for (let args of arrayGenerator(arr)) {
        if (fn(...args)) return true;
    }
    return false;
};

/**
 * like Array.every
 * @param arr array
 * @param fn callback
 */
const every = <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => boolean): boolean => {
    for (let args of arrayGenerator(arr)) {
        if (!fn(...args)) return false;
    }
    return true;
};

/**
 * like Array.map
 * @param arr array
 * @param fn callback
 */
const map = <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => T): DeepArray<T> => {
    const shapes = shape(arr);
    const it = xrange(shapes);
    const ret = [];
    let refs = [ret];
    let mrefs = [arr];
    let ln = shapes.length;

    for (let i of xrange(ln)) {
        const coordinate = shapes[i];
        const cacheRefs = [];
        const cacheMRefs = [];
        for (let idx of xrange(refs.length)) {
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
                    ref[idx] = fn(el as T, it.next().value, arr);
                });
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
 * like Array.filter
 * @param arr array
 * @param fn callback
 */
const filter = <T>(arr: DeepArray<T>, fn: (item: T, coordinate: Coordinate, arr: DeepArray<T>) => boolean): DeepArray<T> => {
    const shapes = shape(arr);
    const it = xrange(shapes);
    const ret = [];
    let refs = [ret];
    let mrefs = [arr];
    let ln = shapes.length;

    for (let i of xrange(ln)) {
        const coordinate = shapes[i];
        const cacheRefs = [];
        const cacheMRefs = [];
        for (let idx of xrange(refs.length)) {
            const ref = refs[idx];
            const mref = mrefs[idx];
            if (i === ln - 1) {
                ref.length = coordinate;
                mref.forEach((el, idx) => {
                    fn(el as T, it.next().value, arr) && (ref[idx] = el);
                })
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

function reduceBasic <T>(arr: DeepArray<T>, fn: (previousValue: any, item: T, coordinate: Coordinate, arr: DeepArray<T>) => any, previousValue?: any, isReverse: boolean = false) {
    const it = isReverse ? arrayGeneratorReverse(arr) : arrayGenerator(arr);
    let ret = previousValue;
    if (ret === undefined) {
        let result = it.next().value;
        if (result) ret = result[0];
        /* when empty array, return undefined */
        else return undefined;
    }
    for (let args of it) {
        ret = fn(ret, ...args);
    }
    return ret;
};

/**
 * like Array.reduce
 * @param arr array
 * @param fn callback
 */
const reduce = <T>(arr: DeepArray<T>, fn: (previousValue: any, item: T, coordinate: Coordinate, arr: DeepArray<T>) => any, previousValue?: any): any => reduceBasic(arr, fn, previousValue);

/**
 * like Array.reduceRight
 * @param arr array
 * @param fn callback
 */
const reduceBack = <T>(arr: DeepArray<T>, fn: (previousValue: any, item: T, coordinate: Coordinate, arr: DeepArray<T>) => any, previousValue?: any): any => reduceBasic(arr, fn, previousValue, true);

export {
    /* Array metods like */
    each, eachBack, each as forEach, eachBack as forEachBack, some, every, filter, map, reduce, reduceBack,
    arrayGenerator,
    arrayGeneratorReverse,
};
