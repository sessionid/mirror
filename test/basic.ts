import 'mocha';
import * as chai from 'chai';
const should = chai.should();
import { shape, count, set, get, clear, rank, isContainable } from '../src/basic';
import { createRandArr } from './util';

describe('basic', function () {
    describe('#shape()', () => {
        it('scalar', () => {
            const scalarList = ['string', 0, null, undefined, {}, { length: 10 }, new Uint16Array(10)];
            scalarList.forEach(scalar => shape(scalar).should.deep.eq([]));
        });

        it('empty vector', () => {
            shape([]).should.deep.eq([0]);
        });

        it('sparse vector', () => {
            const sparse = Array(10);
            sparse[6] = 7;
            shape(sparse).should.deep.eq([sparse.length]);
        });

        it('normal vector', () => {
            const vector = [1, 3, 5, 7, 9];
            shape(vector).should.deep.eq([vector.length]);
        });

        it('arr rank ≥ 2', () => {
            const { dimensionList, arr } = createRandArr(2, 7);
            shape(arr).should.deep.eq(dimensionList);
        });
    });

    describe('#rank()', () => {
        it('scalar', () => {
            const scalarList = ['string', 0, null, undefined, {}, { length: 10 }, new Uint16Array(10)];
            scalarList.forEach(scalar => rank(scalar).should.eq(0));
        });

        it('empty vector', () => {
            rank([]).should.eq(1);
        });

        it('sparse vector', () => {
            const sparse = Array(10);
            sparse[6] = 7;
            rank(sparse).should.eq(1);
        });

        it('normal vector', () => {
            const vector = [1, 3, 5, 7, 9];
            rank(vector).should.eq(1);
        });

        it('arr rank ≥ 2', () => {
            const { dimensionList, arr } = createRandArr(2, 7);
            rank(arr).should.eq(dimensionList.length);
        });
    });

    describe('#count()', () => {
        it('scalar', () => {
            const scalarList = ['string', 0, null, undefined, {}, { length: 10 }, new Uint16Array(10)];
            scalarList.forEach(scalar => count(scalar).should.eq(1));
        });

        it('empty vector', () => {
            count([]).should.eq(0);
        });

        it('sparse vector', () => {
            const sparse = Array(10);
            sparse[6] = 7;
            count(sparse).should.eq(sparse.length);
        });

        it('normal vector', () => {
            const vector = [1, 3, 5, 7, 9];
            count(vector).should.eq(vector.length);
        });

        it('arr rank ≥ 2', () => {
            const { dimensionList, arr } = createRandArr(2, 7);
            count(arr).should.eq(dimensionList.reduce((total, d) => total * d));
        });
    });

    describe('#get()', () => {
        it('vector in range', () => {
            const vector = [0, 1, 2, 3, 4, 5];
            get(vector, [3]).should.eq(vector[3]);
        });

        it('vector out of range', () => {
            const vector = [0, 1, 2, 3, 4, 5];
            const scalar = get(vector, [6]);
            should.not.exist(scalar);
        });

        it('rank ≥ 2 in range', () => {
            const arr = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
            ]
            get(arr, [2, 2]).should.eq(arr[2][2]);
        });

        it('rank ≥ 2 out of range', () => {
            const arr = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
            ]
            const scalar = get(arr, [5, 5]);
            should.not.exist(scalar);
        });
    });

    describe('#set()', () => {
        it('vector in range', () => {
            const vector = [0, 1, 2, 3, 4, 5];
            const val = set(vector, [3], 9);
            val.should.eq(vector[3]);
            val.should.eq(9);
        });

        it('vector out of range', () => {
            const vector = [0, 1, 2, 3, 4, 5];
            set.bind(null, vector, [1, 2], 9).should.throw('coordinate: [1,2] out of range');
        });

        it('rank ≥ 2 in range', () => {
            const arr = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
            ]
            const ret = set(arr, [2, 2], 111);
            ret.should.eq(111);
            ret.should.eq(arr[2][2]);
        });

        it('rank ≥ 2 out of range', () => {
            const arr = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
            ]
            set.bind(null, arr, [5, 5], 111).should.throw('coordinate: [5,5] out of range');
        });
    });

    describe('#clear()', () => {
        it('vector in range', () => {
            const vector = [0, 1, 2, 3, 4, 5];
            clear(vector, [3]).should.eq(true);
        });

        it('vector out of range', () => {
            const vector = [0, 1, 2, 3, 4, 5];
            clear(vector, [1, 2]).should.eq(false);
        });

        it('rank ≥ 2 in range', () => {
            const arr = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
            ]
            clear(arr, [2, 2]).should.eq(true);
        });

        it('rank ≥ 2 out of range', () => {
            const arr = [
                [0, 1, 2, 3, 4],
                [5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14],
            ]
            clear(arr, [5, 5]).should.eq(false);
        });
    });

    describe('#isContainable', () => {
        describe('#isContainable()', () => {
            const arr = [Array(3), Array(3)];
            const large = [Array(3), Array(3), Array(3)];
            const small = [2,4,4];
            it('equal', () => {
                isContainable(arr, arr).should.eq(true);
            });
            it('small', () => {
                isContainable(arr, small).should.eq(true);
            });
            it('large', () => {
                isContainable(arr, large).should.eq(false);
            });
        });
    });
});