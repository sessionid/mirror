import 'mocha';
import * as chai from 'chai';
chai.should();
import { clone, flat, reshape, split } from '../src/transform';

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

    describe('#split()', () => {

        it('vector', () => {
            const last = Array(2);
            last[0] = 6;
            split([0, 1, 2, 3, 4, 5, 6], [2]).should.deep.eq([[0, 1], [2, 3], [4, 5], last])
        });

        it('matrix', () => {
            const matrix = [
                [0,1,2,3,4],
                [5,6,7,8,9],
                [10,11,12,13,14],
            ];
            const ret = split(matrix, [2,2]) as number[][];
            ret.length.should.eq(2);
            ret[0].length.should.eq(3);
            ret[0][0].should.deep.eq([
                [0,1],
                [5,6]
            ]);
        });
    })
});