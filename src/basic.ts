import { xrange } from './range';
import { Coordinate, DeepArray } from './type';

/**
 * get dimension list of arrary
 * @param arr array
 */
const shape = (arr: any):number[] => {
    if (!Array.isArray(arr)) return [];
    const dimensionList = [arr.length];
    let subArr = arr;
    while (Array.isArray(subArr[0])) {
        subArr = subArr[0];
        dimensionList.push(subArr.length);
    }
    return dimensionList;
}

/**
 * get rank of a array
 * @param arr array
 */
const rank = (arr: any):number => {
    return shape(arr).length;
}

/**
 * count number of elements
 * @param arr array
 */
const count = (arr: any):number => {
    const dimensionList = shape(arr);
    /* rank ≥ 1 */
    if (dimensionList.length) {
        return shape(arr).reduce((total, dimension) => total * dimension);
    }
    /* scalar */
    return 1;
}

/**
 * get the reference of arr[...coordinate]
 * @param arr array
 * @param coordinate coordinate
 */
const locate = <T>(arr:DeepArray<T>, coordinate: Coordinate):{ location:DeepArray<T>|T[], last:number } => {
    let ptr:any = arr;
    let ln = coordinate.length;
    const last = coordinate[ln - 1];
    for(let i of xrange(ln - 1)) {
        try {
            ptr = ptr[coordinate[i]];
        } catch(e) {
            throw new Error(`coordinate: ${JSON.stringify(coordinate)} out of range`);
        }
    }
    return { location: ptr, last };
}

/**
 * arr[...coordinate] = value
 * @param arr array
 * @param coordinate coordinate
 * @param value value
 */
const set = <T>(arr:DeepArray<T>, coordinate: Coordinate, value:T):T => {
    try {
        const { location, last } = locate(arr, coordinate);
        location[last] = value;
    } catch {
        throw new Error(`coordinate: ${JSON.stringify(coordinate)} out of range`);
    }
    return value;
}

/**
 * get arr[...coordinate]
 * @param arr array
 * @param coordinate coordinate
 */
const get = <T>(arr:DeepArray<T>, coordinate: Coordinate):DeepArray<T>|T => {
    try {
        const { location, last } = locate(arr, coordinate);
        return location[last];
    } catch {
        return undefined;
    }
}

/**
 * delete arr[...coordinate]
 * @param arr array
 * @param coordinate coordinate
 */
const clear = (arr:any[], coordinate: Coordinate):boolean => {
    try {
        const { location, last } = locate(arr, coordinate);
        /* if location is scalar should return false but delete scalar[index] will still return true, for example: delete 1[0] */
        return Array.isArray(location) ? delete location[last] : false;
    } catch {
        return false;
    }
}

/**
 * if large array can contain small array
 * @param large large array
 * @param small small array
 */
const isContainable = (large:DeepArray, small:DeepArray):boolean => {
    const ss = shape(small);
    const sl = shape(large);
    if (ss.length < sl.length) return true;
    else if(ss.length > sl.length) return false;
    return sl.every((dimension, idx) => dimension >= ss[idx]);
}

export { 
    shape, count, set, get, clear, rank, isContainable,
};