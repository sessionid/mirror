import { random } from 'faker';

export function createRandArr (floor:number, ceil:number) {
    const dimensionList = Array.apply(null, { length: random.number({ min: floor, max: ceil }) }).map(() => random.number({ min: floor, max: ceil }));
    const arr = createRandArrByShape(dimensionList);
    return { dimensionList: dimensionList, arr };
}

export function createRandArrByShape (shape:number[]) {
    const list = shape.slice();
    const last = list.pop();
    return list.reverse().reduce((arr, d) => Array(d).fill(arr), Array(last));
}
