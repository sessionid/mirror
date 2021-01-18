import { Coordinate } from './type';
import { shape } from './basic';

const compare = (c1: Coordinate, c2: Coordinate, fn:(c1:number, c2:number)=>boolean):boolean => {
    for(let i = 0, ln = c1.length; i < ln; i += 1) {
        if (c1[i] === c2[i] && i < ln - 1) continue;
        return fn(c1[i], c2[i]) ? true : false;
    }
    return false;
}

/**
 * if c1 > c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const gt = (c1:Coordinate, c2:Coordinate) => compare(c1, c2, (c1, c2) => c1 > c2);
/**
 * if c1 >= c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const geq = (c1:Coordinate, c2:Coordinate) => compare(c1, c2, (c1, c2) => c1 >= c2);
/**
 * if c1 < c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const lt = (c1:Coordinate, c2:Coordinate) => gt(c2, c1);
/**
 * if c1 <= c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const leq = (c1:Coordinate, c2:Coordinate) => geq(c2, c1);
/**
 * if c1 === c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const eq = (c1:Coordinate, c2:Coordinate) => compare(c1, c2, (c1, c2) => c1 === c2);
/**
 * if c1 !== c2
 * @param c1 coordinate one
 * @param c2 coordinate two
 */
const neq = (c1:Coordinate, c2:Coordinate) => !eq(c1, c2);

/**
 * get weightlist of array by shape
 * @param shape shape of array
 */
const weightByShape = (shape:number[]):number[] => {
    const last = shape.length - 1;
    if (shape[last] < 0 || shape[0] < 0) throw new Error('invalid shape');
    const identity = shape[last] ? 1 : 0;
    const weightList = [identity];
    for(let i = last, weight = identity; i > 0; i -= 1) {
        const dimension = shape[i];
        if (dimension < 0) throw new Error('invalid shape');
        weight *= dimension;
        weightList.unshift(weight);
    }
    return weightList;
}

/**
 * get weightlist of array
 * @param arr array
 */
const weight = (arr:any[]) => weightByShape(shape(arr));

/**
 * convert coordinate to index
 * @param coordinate coordinate
 * @param weightList weightlist of array
 */
const getIndexByWeight = (coordinate:Coordinate, weightList:number[]):number => {   
    if (coordinate.length !== weightList.length) throw new Error(`coordinate ${JSON.stringify(coordinate)} and weightlist ${JSON.stringify(weightList)} not match`);
    return coordinate.reduce((ret, v, idx) => {
        return ret + v * weightList[idx];
    }, 0);
}

/**
 * convert coordinate to index
 * @param coordinate coordinate
 * @param shape shape of array
 */
const getIndexByShape = (coordinate:Coordinate, shape:number[]):number => {
    if (
        coordinate.length !== shape.length 
        || coordinate.some((c, idx) => c >= shape[idx])
    ) return -1; 
    return getIndexByWeight(coordinate, weightByShape(shape));
};

/**
 * convert coordinate to index
 * @param arr array
 * @param coordinate coordinate
 */
const getIndex = (arr:any[], coordinate:Coordinate):number => {
    return getIndexByShape(coordinate, shape(arr));
}

/**
 * convert index to coordinate by shape and weightlist
 * @param index index
 * @param shape shape of array
 * @param weightList weightlist of array
 */
const getCoordinateByWeightShape = (index:number, shape:number[], weightList:number[]):Coordinate => {
    
    if (shape.length !== weightList.length) throw new Error(`shape ${JSON.stringify(shape)} and weightList ${JSON.stringify(weightList)} not match`);
    
    return weightList.map((weight, idx) => {
        return Math.floor(index / weight) % shape[idx];
    });
};

/**
 * convert index to coordinate by shape
 * @param index index
 * @param shapes shape of array
 */
const getCoordinateByShape = (index:number, shapes:number[]):Coordinate => {
    return getCoordinateByWeightShape(index, shapes, weightByShape(shapes));
}

/**
 * convert index to coordinate
 * @param arr array
 * @param shapes shape of array
 */
const getCoordinate = (arr:number[], index:number):Coordinate => {
    return getCoordinateByShape(index, shape(arr));
};

export {
    /* coordinate compare */ 
    gt, geq, lt, leq, eq, neq,
    /* coordinate & index convert */
    weightByShape,
    weight,
    getIndexByShape as indexByShape,
    getIndexByWeight as indexByWeight,
    getIndex as index,
    getCoordinateByWeightShape as coordinateByWeightShape,
    getCoordinateByShape as coordinateByShape,
    getCoordinate as coordinate,
};