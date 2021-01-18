import 'mocha';
import * as chai from 'chai';
chai.should();
import { clone, flat, reshape } from '../src/transform';

describe('create', () => {

    const arr = [[[1, 2, 3], [4, 5, 6]]];
    it('#clone()', () => {
        const copy = clone(arr);
        copy.should.not.eq(arr);
        copy.should.deep.eq(arr);
    });

    it('#flat()', () => {
        flat(arr).should.deep.eq([1, 2, 3, 4, 5, 6]);
    });

    it('#reshape()', () => {
        reshape(arr, [3, 2]).should.deep.eq([[1, 2], [3, 4], [5, 6]]);
    });
});